import { NextResponse } from "next/server";
import { startNewsletterSubscription } from "@/lib/email/contacts";
import { getResendApiKey } from "@/lib/email/env";
import { readJsonBody } from "@/lib/email/request-guards";
import { toUserFacingLeadError } from "@/lib/email/resend-errors";
import { sendNewsletterConfirmEmail } from "@/lib/email/send-newsletter-confirm";
import { newsletterLeadSchema } from "@/lib/email/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!getResendApiKey()) {
    return NextResponse.json(
      { error: "Email delivery is not configured." },
      { status: 503 },
    );
  }

  const body = await readJsonBody(request);
  if (!body.ok) return body.response;

  const parsed = newsletterLeadSchema.safeParse(body.json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: parsed.error.issues[0]?.message ?? "Invalid submission.",
      },
      { status: 400 },
    );
  }

  if (parsed.data.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  try {
    const pending = await startNewsletterSubscription({
      email: parsed.data.email,
      source: parsed.data.source,
    });

    if (!pending.ok) {
      return NextResponse.json(
        { error: toUserFacingLeadError(pending.error) },
        { status: 400 },
      );
    }

    if (pending.skipConfirmEmail) {
      return NextResponse.json({
        ok: true,
        alreadySubscribed: pending.alreadySubscribed ?? false,
      });
    }

    const sent = await sendNewsletterConfirmEmail(parsed.data.email);
    if (!sent.ok) {
      return NextResponse.json(
        { error: toUserFacingLeadError(sent.error) },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[leads/newsletter]", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
