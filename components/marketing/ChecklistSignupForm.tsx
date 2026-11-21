"use client";

import { KitChecklistForm } from "@/components/marketing/KitChecklistForm";
import { ResendChecklistForm } from "@/components/marketing/ResendChecklistForm";
import { isResendLeadsEnabled } from "@/lib/leads/flags";

type ChecklistSignupFormProps = {
  compact?: boolean;
  className?: string;
  source?: "checklist_page" | "popup" | "blog" | "other";
  submitLabel?: string;
  onSuccess?: () => void;
};

/**
 * Feature-flagged checklist signup.
 * Default: Kit. Set NEXT_PUBLIC_LEAD_PROVIDER=resend to switch.
 */
export function ChecklistSignupForm(props: ChecklistSignupFormProps) {
  if (isResendLeadsEnabled()) {
    return <ResendChecklistForm {...props} />;
  }

  return (
    <KitChecklistForm compact={props.compact} className={props.className} />
  );
}
