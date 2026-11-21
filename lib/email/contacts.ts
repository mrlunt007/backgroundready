import {
  getChecklistSegmentId,
  getNewsletterSegmentId,
  getNewsletterTopicId,
} from "@/lib/email/env";
import { getResendClient } from "@/lib/email/resend-client";

function nowIso(): string {
  return new Date().toISOString();
}

export async function upsertChecklistContact(options: {
  email: string;
  source: string;
  newsletterOptInRequested: boolean;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const resend = getResendClient();
  const email = options.email.trim().toLowerCase();
  const checklistSegmentId = getChecklistSegmentId();

  const segments = checklistSegmentId
    ? [{ id: checklistSegmentId }]
    : undefined;

  const { error: createError } = await resend.contacts.create({
    email,
    unsubscribed: false,
    properties: {
      lead_type: "checklist",
      checklist_source: options.source,
      checklist_requested_at: nowIso(),
      newsletter_opt_in_requested: options.newsletterOptInRequested
        ? "true"
        : "false",
    },
    ...(segments ? { segments } : {}),
  });

  if (!createError) {
    return { ok: true };
  }

  // Contact may already exist — update properties / segment instead.
  const { error: updateError } = await resend.contacts.update({
    email,
    unsubscribed: false,
    properties: {
      lead_type: "checklist",
      checklist_source: options.source,
      checklist_requested_at: nowIso(),
      newsletter_opt_in_requested: options.newsletterOptInRequested
        ? "true"
        : "false",
    },
  });

  if (updateError) {
    return { ok: false, error: updateError.message };
  }

  if (checklistSegmentId) {
    await resend.contacts.segments.add({
      email,
      segmentId: checklistSegmentId,
    });
  }

  return { ok: true };
}

export async function startNewsletterSubscription(options: {
  email: string;
  source: string;
}): Promise<
  | {
      ok: true;
      skipConfirmEmail?: boolean;
      alreadySubscribed?: boolean;
    }
  | { ok: false; error: string }
> {
  const resend = getResendClient();
  const email = options.email.trim().toLowerCase();
  const newsletterSegmentId = getNewsletterSegmentId();
  const newsletterTopicId = getNewsletterTopicId();

  const { data: existing } = await resend.contacts.get({ email });

  if (existing?.unsubscribed) {
    return {
      ok: false,
      error:
        "This email is unsubscribed. Contact us if you'd like to re-subscribe.",
    };
  }

  const status =
    typeof existing?.properties?.newsletter_status === "string"
      ? existing.properties.newsletter_status
      : null;

  if (status === "confirmed") {
    if (newsletterSegmentId) {
      await resend.contacts.segments.add({
        email,
        segmentId: newsletterSegmentId,
      });
    }
    return { ok: true, skipConfirmEmail: true, alreadySubscribed: true };
  }

  if (status === "pending") {
    const requestedAt = existing?.properties?.newsletter_requested_at;
    if (typeof requestedAt === "string") {
      const ts = Date.parse(requestedAt);
      // Avoid spamming confirmation emails within 24 hours.
      if (!Number.isNaN(ts) && Date.now() - ts < 1000 * 60 * 60 * 24) {
        return { ok: true, skipConfirmEmail: true };
      }
    }
  }

  const { error: createError } = await resend.contacts.create({
    email,
    unsubscribed: false,
    properties: {
      newsletter_status: "pending",
      newsletter_source: options.source,
      newsletter_requested_at: nowIso(),
    },
    ...(newsletterTopicId
      ? {
          topics: [{ id: newsletterTopicId, subscription: "opt_out" as const }],
        }
      : {}),
  });

  if (createError) {
    const { error: updateError } = await resend.contacts.update({
      email,
      properties: {
        newsletter_status: "pending",
        newsletter_source: options.source,
        newsletter_requested_at: nowIso(),
      },
    });

    if (updateError) {
      return { ok: false, error: updateError.message };
    }
  }

  if (newsletterSegmentId) {
    await resend.contacts.segments.add({
      email,
      segmentId: newsletterSegmentId,
    });
  }

  return { ok: true };
}

export async function confirmNewsletterSubscription(
  email: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const resend = getResendClient();
  const normalized = email.trim().toLowerCase();
  const newsletterTopicId = getNewsletterTopicId();
  const newsletterSegmentId = getNewsletterSegmentId();

  const { data: existing, error: getError } = await resend.contacts.get({
    email: normalized,
  });

  if (getError && !existing) {
    return { ok: false, error: "Contact not found" };
  }

  if (existing?.unsubscribed) {
    return {
      ok: false,
      error: "This email is unsubscribed and cannot be re-subscribed here.",
    };
  }

  const { error: updateError } = await resend.contacts.update({
    email: normalized,
    unsubscribed: false,
    properties: {
      newsletter_status: "confirmed",
      newsletter_confirmed_at: nowIso(),
    },
  });

  if (updateError) {
    return { ok: false, error: updateError.message };
  }

  if (newsletterSegmentId) {
    await resend.contacts.segments.add({
      email: normalized,
      segmentId: newsletterSegmentId,
    });
  }

  if (newsletterTopicId) {
    await resend.contacts.topics.update({
      email: normalized,
      topics: [{ id: newsletterTopicId, subscription: "opt_in" }],
    });
  }

  return { ok: true };
}

export async function unsubscribeContact(
  email: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const resend = getResendClient();
  const normalized = email.trim().toLowerCase();
  const newsletterTopicId = getNewsletterTopicId();

  const { error } = await resend.contacts.update({
    email: normalized,
    unsubscribed: true,
    properties: {
      newsletter_status: "unsubscribed",
      unsubscribed_at: nowIso(),
    },
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  if (newsletterTopicId) {
    await resend.contacts.topics.update({
      email: normalized,
      topics: [{ id: newsletterTopicId, subscription: "opt_out" }],
    });
  }

  return { ok: true };
}

export async function wasChecklistRecentlySent(
  email: string,
  withinMs = 1000 * 60 * 60 * 24,
): Promise<boolean> {
  const resend = getResendClient();
  const { data } = await resend.contacts.get({
    email: email.trim().toLowerCase(),
  });

  const raw = data?.properties?.checklist_sent_at;
  if (typeof raw !== "string") return false;
  const sentAt = Date.parse(raw);
  if (Number.isNaN(sentAt)) return false;
  return Date.now() - sentAt < withinMs;
}

export async function markChecklistSent(email: string): Promise<void> {
  const resend = getResendClient();
  await resend.contacts.update({
    email: email.trim().toLowerCase(),
    properties: {
      checklist_sent_at: nowIso(),
    },
  });
}
