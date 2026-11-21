"use client";

import { ResendChecklistForm } from "@/components/marketing/ResendChecklistForm";

type ChecklistSignupFormProps = {
  compact?: boolean;
  className?: string;
  source?: "checklist_page" | "popup" | "blog" | "other";
  submitLabel?: string;
  onSuccess?: () => void;
};

/** Native Resend checklist signup (Kit fully removed). */
export function ChecklistSignupForm(props: ChecklistSignupFormProps) {
  return <ResendChecklistForm {...props} />;
}
