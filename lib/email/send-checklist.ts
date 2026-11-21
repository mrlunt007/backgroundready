import { ChecklistDeliveryEmail } from "@/emails/ChecklistDeliveryEmail";
import {
  getPublicSiteUrl,
  getResendFrom,
  getResendReplyTo,
} from "@/lib/email/env";
import {
  getChecklistPdfPublicUrl,
  loadChecklistPdfAttachment,
} from "@/lib/email/pdf";
import { getResendClient } from "@/lib/email/resend-client";
import { createLeadToken } from "@/lib/email/tokens";

export async function sendChecklistDeliveryEmail(email: string): Promise<
  | { ok: true; emailId: string; downloadUrl: string }
  | { ok: false; error: string }
> {
  const resend = getResendClient();
  const downloadUrl = getChecklistPdfPublicUrl();
  const siteUrl = getPublicSiteUrl();
  const attachment = await loadChecklistPdfAttachment();

  if (!attachment) {
    return {
      ok: false,
      error:
        "Checklist PDF is missing on the server. Expected public/downloads/background-ready-free-checklist.pdf",
    };
  }

  let unsubscribeUrl: string | undefined;
  try {
    const token = createLeadToken(email, "unsubscribe", 60 * 60 * 24 * 365);
    unsubscribeUrl = `${siteUrl}/unsubscribe?token=${encodeURIComponent(token)}`;
  } catch {
    unsubscribeUrl = undefined;
  }

  const { data, error } = await resend.emails.send({
    from: getResendFrom(),
    to: email,
    replyTo: getResendReplyTo(),
    subject: "Your Free Background Check Readiness Checklist",
    react: ChecklistDeliveryEmail({
      downloadUrl,
      siteUrl,
      unsubscribeUrl,
    }),
    attachments: [
      {
        filename: attachment.filename,
        content: attachment.content,
      },
    ],
    tags: [
      { name: "category", value: "checklist_delivery" },
    ],
  });

  if (error || !data) {
    return { ok: false, error: error?.message ?? "Failed to send email" };
  }

  return { ok: true, emailId: data.id, downloadUrl };
}
