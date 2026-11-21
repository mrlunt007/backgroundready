import { render } from "@react-email/render";
import { ChecklistDeliveryEmail } from "@/emails/ChecklistDeliveryEmail";
import {
  getPublicSiteUrl,
  getResendFrom,
  getResendReplyTo,
} from "@/lib/email/env";
import { errorFields, logLeadEvent } from "@/lib/email/logging";
import {
  getChecklistPdfPublicUrl,
  loadChecklistPdfAttachment,
} from "@/lib/email/pdf";
import { getResendClient } from "@/lib/email/resend-client";
import { createLeadToken } from "@/lib/email/tokens";

export async function sendChecklistDeliveryEmail(email: string): Promise<
  | { ok: true; emailId: string; downloadUrl: string }
  | { ok: false; error: string; stage: string }
> {
  const downloadUrl = getChecklistPdfPublicUrl();
  const siteUrl = getPublicSiteUrl();

  let unsubscribeUrl: string | undefined;
  try {
    const token = createLeadToken(email, "unsubscribe", 60 * 60 * 24 * 365);
    unsubscribeUrl = `${siteUrl}/unsubscribe?token=${encodeURIComponent(token)}`;
  } catch (error) {
    logLeadEvent("checklist", {
      stage: "unsubscribe_token",
      ok: false,
      ...errorFields(error),
      detail: "continuing_without_unsubscribe_link",
    });
    unsubscribeUrl = undefined;
  }

  let html: string;
  try {
    html = await render(
      ChecklistDeliveryEmail({
        downloadUrl,
        siteUrl,
        unsubscribeUrl,
      }),
    );
    logLeadEvent("checklist", {
      stage: "render_email",
      ok: true,
      detail: `html_bytes=${html.length}`,
    });
  } catch (error) {
    logLeadEvent("checklist", {
      stage: "render_email",
      ok: false,
      ...errorFields(error),
    });
    return {
      ok: false,
      stage: "render_email",
      error:
        error instanceof Error
          ? error.message
          : "Failed to render checklist email",
    };
  }

  const attachment = await loadChecklistPdfAttachment();
  if (!attachment) {
    return {
      ok: false,
      stage: "pdf_attachment",
      error:
        "Checklist PDF is missing on the server. Expected public/downloads/background-ready-free-checklist.pdf",
    };
  }

  try {
    const resend = getResendClient();
    const attachmentPayload =
      "path" in attachment
        ? { filename: attachment.filename, path: attachment.path }
        : { filename: attachment.filename, content: attachment.content };

    logLeadEvent("checklist", {
      stage: "resend_send",
      ok: true,
      detail: `attachment_source=${attachment.source}`,
    });

    const { data, error } = await resend.emails.send({
      from: getResendFrom(),
      to: email,
      replyTo: getResendReplyTo(),
      subject: "Your Free Background Check Readiness Checklist",
      html,
      attachments: [attachmentPayload],
      tags: [{ name: "category", value: "checklist_delivery" }],
    });

    if (error || !data) {
      logLeadEvent("checklist", {
        stage: "resend_send",
        ok: false,
        errorType: "resend_api",
        errorName: error?.name,
        statusCode: error?.statusCode ?? null,
        message: error?.message ?? "Failed to send email",
      });
      return {
        ok: false,
        stage: "resend_send",
        error: error?.message ?? "Failed to send email",
      };
    }

    logLeadEvent("checklist", {
      stage: "resend_send",
      ok: true,
      detail: "accepted",
    });

    return { ok: true, emailId: data.id, downloadUrl };
  } catch (error) {
    logLeadEvent("checklist", {
      stage: "resend_send",
      ok: false,
      ...errorFields(error),
    });
    return {
      ok: false,
      stage: "resend_send",
      error:
        error instanceof Error ? error.message : "Failed to send checklist email",
    };
  }
}
