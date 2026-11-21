import { render } from "@react-email/render";
import { NewsletterConfirmEmail } from "@/emails/NewsletterConfirmEmail";
import {
  getPublicSiteUrl,
  getResendFrom,
  getResendReplyTo,
} from "@/lib/email/env";
import { errorFields, logLeadEvent } from "@/lib/email/logging";
import { getResendClient } from "@/lib/email/resend-client";
import { createLeadToken } from "@/lib/email/tokens";

export async function sendNewsletterConfirmEmail(email: string): Promise<
  | { ok: true; emailId: string }
  | { ok: false; error: string }
> {
  const siteUrl = getPublicSiteUrl();

  let confirmUrl: string;
  try {
    const token = createLeadToken(email, "newsletter_confirm", 60 * 60 * 48);
    confirmUrl = `${siteUrl}/confirm?token=${encodeURIComponent(token)}`;
  } catch (error) {
    logLeadEvent("newsletter", {
      stage: "confirm_token",
      ok: false,
      ...errorFields(error),
    });
    return { ok: false, error: "Confirmation email is misconfigured." };
  }

  let html: string;
  try {
    html = await render(
      NewsletterConfirmEmail({
        confirmUrl,
        siteUrl,
      }),
    );
  } catch (error) {
    logLeadEvent("newsletter", {
      stage: "render_confirm_email",
      ok: false,
      ...errorFields(error),
    });
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to render confirmation email",
    };
  }

  try {
    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: getResendFrom(),
      to: email,
      replyTo: getResendReplyTo(),
      subject: "Confirm your BackgroundReady newsletter subscription",
      html,
      tags: [{ name: "category", value: "newsletter_confirm" }],
    });

    if (error || !data) {
      logLeadEvent("newsletter", {
        stage: "resend_send_confirm",
        ok: false,
        errorType: "resend_api",
        errorName: error?.name,
        statusCode: error?.statusCode ?? null,
        message: error?.message ?? "Failed to send confirmation",
      });
      return { ok: false, error: error?.message ?? "Failed to send confirmation" };
    }

    return { ok: true, emailId: data.id };
  } catch (error) {
    logLeadEvent("newsletter", {
      stage: "resend_send_confirm",
      ok: false,
      ...errorFields(error),
    });
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to send confirmation email",
    };
  }
}
