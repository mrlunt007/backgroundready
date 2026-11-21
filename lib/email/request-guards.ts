import { NextResponse } from "next/server";

const MAX_BODY_BYTES = 4_096;

/**
 * Lightweight request guards (no Redis / no in-memory rate limiter).
 * Persistent IP rate limiting is intentionally deferred until Upstash (or similar) is added.
 */
export async function readJsonBody(
  request: Request,
): Promise<
  | { ok: true; json: unknown }
  | { ok: false; response: NextResponse }
> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Content-Type must be application/json." },
        { status: 415 },
      ),
    };
  }

  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Request body is too large." },
        { status: 413 },
      ),
    };
  }

  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) {
      return {
        ok: false,
        response: NextResponse.json(
          { error: "Request body is too large." },
          { status: 413 },
        ),
      };
    }
    return { ok: true, json: text ? JSON.parse(text) : {} };
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: "Invalid JSON body." }, { status: 400 }),
    };
  }
}
