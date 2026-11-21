import { NextResponse } from "next/server";
import { getResendApiKey } from "@/lib/email/env";
import { errorFields, logLeadEvent } from "@/lib/email/logging";
import { processChecklistLead } from "@/lib/email/process-checklist";
import { readJsonBody } from "@/lib/email/request-guards";
import { toUserFacingLeadError } from "@/lib/email/resend-errors";
import { checklistLeadSchema } from "@/lib/email/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!getResendApiKey()) {
    logLeadEvent("checklist", {
      stage: "config",
      ok: false,
      errorType: "missing_env",
      message: "RESEND_API_KEY is not configured",
    });
    return NextResponse.json(
      { error: "Email delivery is not configured." },
      { status: 503 },
    );
  }

  const body = await readJsonBody(request);
  if (!body.ok) return body.response;

  const parsed = checklistLeadSchema.safeParse(body.json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: parsed.error.issues[0]?.message ?? "Invalid submission.",
      },
      { status: 400 },
    );
  }

  // Honeypot filled — pretend success.
  if (parsed.data.company.trim()) {
    return NextResponse.json({
      ok: true,
      alreadySent: false,
      downloadUrl: "/downloads/background-ready-free-checklist.pdf",
      newsletterConfirmSent: false,
      contactSynced: true,
    });
  }

  try {
    const result = await processChecklistLead(parsed.data);
    if (!result.ok) {
      logLeadEvent("checklist", {
        stage: result.stage ?? "process",
        ok: false,
        errorType: "process_failed",
        message: result.error,
        statusCode: result.status ?? 500,
      });
      return NextResponse.json(
        { error: toUserFacingLeadError(result.error) },
        { status: result.status ?? 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      alreadySent: result.alreadySent,
      downloadUrl: result.downloadUrl,
      newsletterConfirmSent: result.newsletterConfirmSent,
      contactSynced: result.contactSynced,
    });
  } catch (error) {
    logLeadEvent("checklist", {
      stage: "unhandled",
      ok: false,
      ...errorFields(error),
    });
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
