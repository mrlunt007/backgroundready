import { getResendClient } from "@/lib/email/resend-client";

const REQUIRED_STRING_PROPERTIES = [
  "lead_type",
  "checklist_source",
  "checklist_requested_at",
  "checklist_sent_at",
  "newsletter_opt_in_requested",
  "newsletter_status",
  "newsletter_source",
  "newsletter_requested_at",
  "newsletter_confirmed_at",
  "unsubscribed_at",
] as const;

let ensurePromise: Promise<void> | null = null;

/**
 * Resend rejects contact create/update if custom property keys don't exist yet.
 * Ensure our keys are registered (idempotent).
 */
export async function ensureLeadContactProperties(): Promise<void> {
  if (ensurePromise) return ensurePromise;

  ensurePromise = (async () => {
    const resend = getResendClient();
    const { data, error } = await resend.contactProperties.list({ limit: 100 });

    if (error || !data) {
      // Can't list — skip; callers must tolerate property write failures.
      console.warn("[contact-properties] list failed:", error?.message);
      return;
    }

    const existing = new Set(data.data.map((property) => property.key));

    for (const key of REQUIRED_STRING_PROPERTIES) {
      if (existing.has(key)) continue;
      const created = await resend.contactProperties.create({
        key,
        type: "string",
      });
      if (created.error) {
        console.warn(
          `[contact-properties] failed to create ${key}:`,
          created.error.message,
        );
      }
    }
  })();

  try {
    await ensurePromise;
  } catch (error) {
    console.warn("[contact-properties] ensure failed:", error);
    ensurePromise = null;
  }
}
