import { createHmac, timingSafeEqual } from "node:crypto";
import { getLeadSigningSecret } from "@/lib/email/env";

export type LeadTokenPurpose = "newsletter_confirm" | "unsubscribe";

type TokenPayload = {
  email: string;
  purpose: LeadTokenPurpose;
  exp: number;
};

function getSecret(): string {
  const secret = getLeadSigningSecret();
  if (!secret) {
    throw new Error("LEAD_SIGNING_SECRET or RESEND_API_KEY is required");
  }
  return secret;
}

function encode(payload: TokenPayload): string {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

function sign(encoded: string): string {
  return createHmac("sha256", getSecret()).update(encoded).digest("base64url");
}

export function createLeadToken(
  email: string,
  purpose: LeadTokenPurpose,
  ttlSeconds: number,
): string {
  const payload: TokenPayload = {
    email: email.trim().toLowerCase(),
    purpose,
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
  };
  const encoded = encode(payload);
  return `${encoded}.${sign(encoded)}`;
}

export function verifyLeadToken(
  token: string,
  purpose: LeadTokenPurpose,
): { ok: true; email: string } | { ok: false; error: string } {
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) {
    return { ok: false, error: "Invalid token" };
  }

  const expected = sign(encoded);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return { ok: false, error: "Invalid token signature" };
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8"),
    ) as TokenPayload;

    if (payload.purpose !== purpose) {
      return { ok: false, error: "Wrong token purpose" };
    }
    if (!payload.email || typeof payload.exp !== "number") {
      return { ok: false, error: "Malformed token" };
    }
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return { ok: false, error: "Token expired" };
    }

    return { ok: true, email: payload.email };
  } catch {
    return { ok: false, error: "Malformed token" };
  }
}
