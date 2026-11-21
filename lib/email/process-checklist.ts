import {
  markChecklistSent,
  startNewsletterSubscription,
  upsertChecklistContact,
  wasChecklistRecentlySent,
} from "@/lib/email/contacts";
import { toUserFacingLeadError } from "@/lib/email/resend-errors";
import { sendChecklistDeliveryEmail } from "@/lib/email/send-checklist";
import { sendNewsletterConfirmEmail } from "@/lib/email/send-newsletter-confirm";
import type { ChecklistLeadInput } from "@/lib/email/validation";

export async function processChecklistLead(input: ChecklistLeadInput): Promise<
  | {
      ok: true;
      alreadySent: boolean;
      downloadUrl: string;
      newsletterConfirmSent: boolean;
    }
  | { ok: false; error: string; status?: number }
> {
  const email = input.email.trim().toLowerCase();

  // Contact sync is important, but PDF delivery is the primary success path.
  const contactResult = await upsertChecklistContact({
    email,
    source: input.source,
    newsletterOptInRequested: Boolean(input.newsletterOptIn),
  });

  if (!contactResult.ok) {
    console.warn("[checklist] contact sync failed:", contactResult.error);
    // Continue — still attempt delivery for a new subscriber.
  }

  const recentlySent = await wasChecklistRecentlySent(email);
  let downloadUrl = "";
  let alreadySent = false;

  if (recentlySent) {
    alreadySent = true;
    const { getChecklistPdfPublicUrl } = await import("@/lib/email/pdf");
    downloadUrl = getChecklistPdfPublicUrl();
  } else {
    const sent = await sendChecklistDeliveryEmail(email);
    if (!sent.ok) {
      return {
        ok: false,
        error: toUserFacingLeadError(sent.error),
        status: 502,
      };
    }
    downloadUrl = sent.downloadUrl;
    await markChecklistSent(email);
  }

  let newsletterConfirmSent = false;
  if (input.newsletterOptIn) {
    const pending = await startNewsletterSubscription({
      email,
      source: input.source,
    });
    if (pending.ok && !pending.skipConfirmEmail) {
      const confirm = await sendNewsletterConfirmEmail(email);
      newsletterConfirmSent = confirm.ok;
    }
  }

  return {
    ok: true,
    alreadySent,
    downloadUrl,
    newsletterConfirmSent,
  };
}
