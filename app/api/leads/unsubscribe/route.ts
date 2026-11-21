import { NextResponse } from "next/server";
import { unsubscribeContact } from "@/lib/email/contacts";
import { getResendApiKey } from "@/lib/email/env";
import { toUserFacingLeadError } from "@/lib/email/resend-errors";
import { verifyLeadToken } from "@/lib/email/tokens";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!getResendApiKey()) {
    return NextResponse.json(
      { error: "Unsubscribe is not available." },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const token =
    typeof json === "object" &&
    json &&
    "token" in json &&
    typeof (json as { token: unknown }).token === "string"
      ? (json as { token: string }).token
      : null;

  if (!token) {
    return NextResponse.json({ error: "Missing token." }, { status: 400 });
  }

  const verified = verifyLeadToken(token, "unsubscribe");
  if (!verified.ok) {
    return NextResponse.json({ error: verified.error }, { status: 400 });
  }

  const result = await unsubscribeContact(verified.email);
  if (!result.ok) {
    return NextResponse.json(
      { error: toUserFacingLeadError(result.error) },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true });
}
