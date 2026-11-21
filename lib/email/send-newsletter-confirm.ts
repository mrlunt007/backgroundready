import { NewsletterConfirmEmail } from "@/emails/NewsletterConfirmEmail";
import {
  getPublicSiteUrl,
  getResendFrom,
  getResendReplyTo,
} from "@/lib/email/env";
import { getResendClient } from "@/lib/email/resend-client";
import { createLeadToken } from "@/lib/email/tokens";

export async function sendNewsletterConfirmEmail(email: string): Promise<
  | { ok: true; emailId: string }
  | { ok: false; error: string }
> {
  const resend = getResendClient();
  const siteUrl = getPublicSiteUrl();
  const token = createLeadToken(email, "newsletter_confirm", 60 * 60 * 48);
  const confirmUrl = `${siteUrl}/confirm?token=${encodeURIComponent(token)}`;

  const { data, error } = await resend.emails.send({
    from: getResendFrom(),
    to: email,
    replyTo: getResendReplyTo(),
    subject: "Confirm your BackgroundReady newsletter subscription",
    react: NewsletterConfirmEmail({
      confirmUrl,
      siteUrl,
    }),
    tags: [{ name: "category", value: "newsletter_confirm" }],
  });

  if (error || !data) {
    return { ok: false, error: error?.message ?? "Failed to send confirmation" };
  }

  return { ok: true, emailId: data.id };
}
