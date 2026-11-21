import { CONTACT_EMAIL, SITE_URL } from "@/lib/constants";

export function getResendApiKey(): string | null {
  return process.env.RESEND_API_KEY?.trim() || null;
}

export function getResendFrom(): string {
  const email = process.env.RESEND_FROM_EMAIL?.trim() || CONTACT_EMAIL;
  return `BackgroundReady <${email}>`;
}

export function getResendReplyTo(): string {
  return process.env.RESEND_REPLY_TO?.trim() || CONTACT_EMAIL;
}

export function getLeadSigningSecret(): string | null {
  return (
    process.env.LEAD_SIGNING_SECRET?.trim() ||
    process.env.RESEND_API_KEY?.trim() ||
    null
  );
}

export function getChecklistSegmentId(): string | null {
  return process.env.RESEND_SEGMENT_CHECKLIST_ID?.trim() || null;
}

export function getNewsletterSegmentId(): string | null {
  return process.env.RESEND_SEGMENT_NEWSLETTER_ID?.trim() || null;
}

export function getNewsletterTopicId(): string | null {
  return process.env.RESEND_TOPIC_NEWSLETTER_ID?.trim() || null;
}

export function getPublicSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || SITE_URL;
}

export function assertResendConfigured(): string {
  const key = getResendApiKey();
  if (!key) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return key;
}
