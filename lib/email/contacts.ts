import { ensureLeadContactProperties } from "@/lib/email/contact-properties";
import {
  getChecklistSegmentId,
  getNewsletterSegmentId,
  getNewsletterTopicId,
} from "@/lib/email/env";
import { errorFields, logLeadEvent } from "@/lib/email/logging";
import {
  isContactAlreadyExistsError,
  isContactNotFoundError,
} from "@/lib/email/resend-errors";
import { getResendClient } from "@/lib/email/resend-client";

function nowIso(): string {
  return new Date().toISOString();
}

type ContactRecord = {
  id?: string;
  email?: string;
  unsubscribed?: boolean;
  properties?: Record<string, unknown> | null;
};

async function getContact(
  email: string,
): Promise<{ contact: ContactRecord | null; notFound: boolean; error?: string }> {
  const resend = getResendClient();
  const { data, error } = await resend.contacts.get({ email });

  if (data) {
    return { contact: data as ContactRecord, notFound: false };
  }

  if (isContactNotFoundError(error)) {
    return { contact: null, notFound: true };
  }

  // Some SDK/API responses use empty data without a clear not_found name.
  if (!error || (error.message ?? "").toLowerCase().includes("not found")) {
    return { contact: null, notFound: true };
  }

  return { contact: null, notFound: false, error: error.message };
}

/**
 * Ensure a Resend contact exists for this email.
 * Creates only when get() indicates the contact is missing.
 */
export async function ensureContactExists(options: {
  email: string;
  segmentIds?: string[];
  topics?: Array<{ id: string; subscription: "opt_in" | "opt_out" }>;
}): Promise<{ ok: true; contact: ContactRecord } | { ok: false; error: string }> {
  const email = options.email.trim().toLowerCase();
  const existing = await getContact(email);

  if (existing.contact) {
    return { ok: true, contact: existing.contact };
  }

  if (!existing.notFound && existing.error) {
    return { ok: false, error: existing.error };
  }

  const resend = getResendClient();
  const segments = options.segmentIds?.map((id) => ({ id }));

  const { data, error } = await resend.contacts.create({
    email,
    unsubscribed: false,
    ...(segments?.length ? { segments } : {}),
    ...(options.topics?.length ? { topics: options.topics } : {}),
  });

  if (data) {
    return { ok: true, contact: { id: data.id, email, unsubscribed: false } };
  }

  if (isContactAlreadyExistsError(error)) {
    const again = await getContact(email);
    if (again.contact) {
      return { ok: true, contact: again.contact };
    }
  }

  // Retry bare create if segment/topic payload was the problem.
  if (error && (options.segmentIds?.length || options.topics?.length)) {
    const bare = await resend.contacts.create({
      email,
      unsubscribed: false,
    });
    if (bare.data) {
      return {
        ok: true,
        contact: { id: bare.data.id, email, unsubscribed: false },
      };
    }
    if (isContactAlreadyExistsError(bare.error)) {
      const again = await getContact(email);
      if (again.contact) {
        return { ok: true, contact: again.contact };
      }
    }
    return {
      ok: false,
      error: bare.error?.message ?? error.message ?? "Failed to create contact",
    };
  }

  return {
    ok: false,
    error: error?.message ?? "Failed to create contact",
  };
}

async function softUpdateProperties(
  email: string,
  properties: Record<string, string>,
): Promise<void> {
  try {
    await ensureLeadContactProperties();
    const resend = getResendClient();
    const { error } = await resend.contacts.update({
      email,
      properties,
    });
    if (error) {
      logLeadEvent("contacts", {
        stage: "contact_properties",
        ok: false,
        errorType: "resend_api",
        errorName: error.name,
        statusCode: error.statusCode ?? null,
        message: error.message,
        detail: "optional_property_update_failed",
      });
    }
  } catch (error) {
    logLeadEvent("contacts", {
      stage: "contact_properties",
      ok: false,
      ...errorFields(error),
      detail: "optional_property_update_threw",
    });
  }
}

async function softAddSegment(email: string, segmentId: string): Promise<void> {
  try {
    const resend = getResendClient();
    const { error } = await resend.contacts.segments.add({
      email,
      segmentId,
    });
    if (error && !isContactAlreadyExistsError(error)) {
      logLeadEvent("contacts", {
        stage: "contact_segment",
        ok: false,
        errorType: "resend_api",
        errorName: error.name,
        statusCode: error.statusCode ?? null,
        message: error.message,
        detail: "optional_segment_add_failed",
      });
    }
  } catch (error) {
    logLeadEvent("contacts", {
      stage: "contact_segment",
      ok: false,
      ...errorFields(error),
      detail: "optional_segment_add_threw",
    });
  }
}

export async function upsertChecklistContact(options: {
  email: string;
  source: string;
  newsletterOptInRequested: boolean;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const email = options.email.trim().toLowerCase();
  const checklistSegmentId = getChecklistSegmentId();

  const ensured = await ensureContactExists({
    email,
    segmentIds: checklistSegmentId ? [checklistSegmentId] : [],
  });

  if (!ensured.ok) {
    return { ok: false, error: ensured.error };
  }

  // Never flip a globally unsubscribed contact back on via checklist request.
  if (ensured.contact.unsubscribed) {
    if (checklistSegmentId) {
      await softAddSegment(email, checklistSegmentId);
    }
  } else if (checklistSegmentId) {
    await softAddSegment(email, checklistSegmentId);
  }

  await softUpdateProperties(email, {
    lead_type: "checklist",
    checklist_source: options.source,
    checklist_requested_at: nowIso(),
    newsletter_opt_in_requested: options.newsletterOptInRequested
      ? "true"
      : "false",
  });

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
  const email = options.email.trim().toLowerCase();
  const newsletterSegmentId = getNewsletterSegmentId();
  const newsletterTopicId = getNewsletterTopicId();

  const ensured = await ensureContactExists({
    email,
    segmentIds: newsletterSegmentId ? [newsletterSegmentId] : [],
    topics: newsletterTopicId
      ? [{ id: newsletterTopicId, subscription: "opt_out" }]
      : [],
  });

  if (!ensured.ok) {
    return { ok: false, error: ensured.error };
  }

  if (ensured.contact.unsubscribed) {
    return {
      ok: false,
      error:
        "This email is unsubscribed. Contact us if you'd like to re-subscribe.",
    };
  }

  const status =
    typeof ensured.contact.properties?.newsletter_status === "string"
      ? ensured.contact.properties.newsletter_status
      : null;

  if (status === "confirmed") {
    if (newsletterSegmentId) {
      await softAddSegment(email, newsletterSegmentId);
    }
    return { ok: true, skipConfirmEmail: true, alreadySubscribed: true };
  }

  if (status === "pending") {
    const requestedAt = ensured.contact.properties?.newsletter_requested_at;
    if (typeof requestedAt === "string") {
      const ts = Date.parse(requestedAt);
      if (!Number.isNaN(ts) && Date.now() - ts < 1000 * 60 * 60 * 24) {
        return { ok: true, skipConfirmEmail: true };
      }
    }
  }

  if (newsletterSegmentId) {
    await softAddSegment(email, newsletterSegmentId);
  }

  await softUpdateProperties(email, {
    newsletter_status: "pending",
    newsletter_source: options.source,
    newsletter_requested_at: nowIso(),
  });

  return { ok: true };
}

export async function confirmNewsletterSubscription(
  email: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const resend = getResendClient();
  const normalized = email.trim().toLowerCase();
  const newsletterTopicId = getNewsletterTopicId();
  const newsletterSegmentId = getNewsletterSegmentId();

  const existing = await getContact(normalized);

  if (existing.notFound || !existing.contact) {
    // Confirmation link should only work for contacts that started signup.
    return {
      ok: false,
      error: "This confirmation link is invalid or has expired.",
    };
  }

  if (existing.contact.unsubscribed) {
    return {
      ok: false,
      error: "This email is unsubscribed and cannot be re-subscribed here.",
    };
  }

  await ensureLeadContactProperties();

  const { error: updateError } = await resend.contacts.update({
    email: normalized,
    unsubscribed: false,
    properties: {
      newsletter_status: "confirmed",
      newsletter_confirmed_at: nowIso(),
    },
  });

  if (updateError && !isContactNotFoundError(updateError)) {
    // Properties may fail; still try topic opt-in.
    console.warn("[contacts] confirm property update failed:", updateError.message);
  }

  if (newsletterSegmentId) {
    await softAddSegment(normalized, newsletterSegmentId);
  }

  if (newsletterTopicId) {
    const { error: topicError } = await resend.contacts.topics.update({
      email: normalized,
      topics: [{ id: newsletterTopicId, subscription: "opt_in" }],
    });
    if (topicError) {
      return {
        ok: false,
        error: "We couldn't confirm your subscription. Please try again.",
      };
    }
  }

  return { ok: true };
}

export async function unsubscribeContact(
  email: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const resend = getResendClient();
  const normalized = email.trim().toLowerCase();
  const newsletterTopicId = getNewsletterTopicId();

  const existing = await getContact(normalized);
  if (existing.notFound || !existing.contact) {
    // Idempotent success — nothing to unsubscribe.
    return { ok: true };
  }

  await ensureLeadContactProperties();

  const { error } = await resend.contacts.update({
    email: normalized,
    unsubscribed: true,
    properties: {
      newsletter_status: "unsubscribed",
      unsubscribed_at: nowIso(),
    },
  });

  if (error && !isContactNotFoundError(error)) {
    // Fall back to global unsubscribe without properties.
    const bare = await resend.contacts.update({
      email: normalized,
      unsubscribed: true,
    });
    if (bare.error) {
      return { ok: false, error: "We couldn't update your preferences." };
    }
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
  const existing = await getContact(email.trim().toLowerCase());
  if (!existing.contact) return false;

  const raw = existing.contact.properties?.checklist_sent_at;
  if (typeof raw !== "string") return false;
  const sentAt = Date.parse(raw);
  if (Number.isNaN(sentAt)) return false;
  return Date.now() - sentAt < withinMs;
}

export async function markChecklistSent(email: string): Promise<void> {
  await softUpdateProperties(email.trim().toLowerCase(), {
    checklist_sent_at: nowIso(),
  });
}
