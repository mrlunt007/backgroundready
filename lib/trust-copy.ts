/** Reassurance micro-copy for conversion points */

export const TRUST_COPY = {
  checklist:
    "Free to start · No credit card · Unsubscribe anytime",
  checklistEmail: "Your info stays private. We never share your data.",
  product: "Instant download · PDF format · Keep forever",
  service: "Confidential · No judgment · Cancel anytime",
  hero: "Free to start · No credit card · Unsubscribe anytime",
  contact: "We respond within two business days · Your message stays private",
  general: "Educational resources only · Not legal advice",
} as const;

export type TrustCopyKey = keyof typeof TRUST_COPY;
