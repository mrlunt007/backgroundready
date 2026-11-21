import {
  markChecklistSent,
  startNewsletterSubscription,
  upsertChecklistContact,
  wasChecklistRecentlySent,
} from "@/lib/email/contacts";
import { errorFields, logLeadEvent } from "@/lib/email/logging";
import { getChecklistPdfPublicUrl } from "@/lib/email/pdf";
import { sendChecklistDeliveryEmail } from "@/lib/email/send-checklist";
import { sendNewsletterConfirmEmail } from "@/lib/email/send-newsletter-confirm";
import type { ChecklistLeadInput } from "@/lib/email/validation";

export async function processChecklistLead(input: ChecklistLeadInput): Promise<
  | {
      ok: true;
      alreadySent: boolean;
      downloadUrl: string;
      newsletterConfirmSent: boolean;
      contactSynced: boolean;
    }
  | { ok: false; error: string; status?: number; stage?: string }
> {
  const email = input.email.trim().toLowerCase();
  logLeadEvent("checklist", { stage: "start", ok: true, detail: input.source });

  let contactSynced = false;
  try {
    const contactResult = await upsertChecklistContact({
      email,
      source: input.source,
      newsletterOptInRequested: Boolean(input.newsletterOptIn),
    });

    if (!contactResult.ok) {
      logLeadEvent("checklist", {
        stage: "contact_sync",
        ok: false,
        errorType: "contact_sync",
        message: contactResult.error,
        detail: "continuing_to_email_delivery",
      });
    } else {
      contactSynced = true;
      logLeadEvent("checklist", { stage: "contact_sync", ok: true });
    }
  } catch (error) {
    // Contact sync must not block PDF delivery.
    logLeadEvent("checklist", {
      stage: "contact_sync",
      ok: false,
      ...errorFields(error),
      detail: "continuing_to_email_delivery",
    });
  }

  let recentlySent = false;
  try {
    recentlySent = await wasChecklistRecentlySent(email);
  } catch (error) {
    logLeadEvent("checklist", {
      stage: "recent_send_check",
      ok: false,
      ...errorFields(error),
      detail: "treating_as_not_recently_sent",
    });
  }

  let downloadUrl = "";
  let alreadySent = false;

  if (recentlySent) {
    alreadySent = true;
    downloadUrl = getChecklistPdfPublicUrl();
    logLeadEvent("checklist", {
      stage: "skip_send_recent",
      ok: true,
      detail: "checklist_already_sent_within_window",
    });
  } else {
    const sent = await sendChecklistDeliveryEmail(email);
    if (!sent.ok) {
      logLeadEvent("checklist", {
        stage: sent.stage,
        ok: false,
        errorType: "delivery",
        message: sent.error,
      });
      return {
        ok: false,
        error: sent.error,
        status: 502,
        stage: sent.stage,
      };
    }

    downloadUrl = sent.downloadUrl;

    // Only mark sent after Resend accepts the email.
    try {
      await markChecklistSent(email);
      logLeadEvent("checklist", { stage: "mark_sent", ok: true });
    } catch (error) {
      // Email already accepted — do not fail the signup for property update issues.
      logLeadEvent("checklist", {
        stage: "mark_sent",
        ok: false,
        ...errorFields(error),
        detail: "email_accepted_property_update_failed",
      });
    }
  }

  let newsletterConfirmSent = false;
  if (input.newsletterOptIn) {
    try {
      const pending = await startNewsletterSubscription({
        email,
        source: input.source,
      });
      if (pending.ok && !pending.skipConfirmEmail) {
        const confirm = await sendNewsletterConfirmEmail(email);
        newsletterConfirmSent = confirm.ok;
        logLeadEvent("checklist", {
          stage: "newsletter_confirm",
          ok: confirm.ok,
          message: confirm.ok ? undefined : confirm.error,
        });
      } else if (!pending.ok) {
        logLeadEvent("checklist", {
          stage: "newsletter_opt_in",
          ok: false,
          message: pending.error,
        });
      }
    } catch (error) {
      logLeadEvent("checklist", {
        stage: "newsletter_opt_in",
        ok: false,
        ...errorFields(error),
      });
    }
  }

  if (!contactSynced) {
    logLeadEvent("checklist", {
      stage: "partial_success",
      ok: true,
      detail: "email_ok_contact_sync_failed",
    });
  } else {
    logLeadEvent("checklist", { stage: "complete", ok: true });
  }

  return {
    ok: true,
    alreadySent,
    downloadUrl,
    newsletterConfirmSent,
    contactSynced,
  };
}
