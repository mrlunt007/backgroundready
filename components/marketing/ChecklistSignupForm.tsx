"use client";

import { useEffect, useRef } from "react";
import { TrustMicroCopy } from "@/components/ui/TrustMicroCopy";
import { KIT_CHECKLIST_FORM } from "@/lib/constants";
import { TRUST_COPY } from "@/lib/trust-copy";
import { cn } from "@/lib/utils";

type ChecklistSignupFormProps = {
  /** Compact layout for blog/inline embeds */
  compact?: boolean;
  className?: string;
};

/**
 * Loads the Kit (ConvertKit) inline form. The script injects the form
 * next to itself, so we append it into a stable container on the client.
 */
export function ChecklistSignupForm({
  compact = false,
  className,
}: ChecklistSignupFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const existing = container.querySelector(
      `script[data-uid="${KIT_CHECKLIST_FORM.uid}"]`,
    );
    if (existing) return;

    const script = document.createElement("script");
    script.async = true;
    script.dataset.uid = KIT_CHECKLIST_FORM.uid;
    script.src = KIT_CHECKLIST_FORM.src;
    container.appendChild(script);

    return () => {
      script.remove();
      // Kit injects sibling markup; clear so remounts don't stack forms.
      container.replaceChildren();
    };
  }, []);

  return (
    <div className={cn("space-y-3", className)}>
      {!compact ? (
        <p className="text-sm text-slate-600">
          Enter your email and we&apos;ll send a confirmation message with your
          PDF download. No spam—just the checklist and occasional readiness tips.
        </p>
      ) : null}
      <div
        ref={containerRef}
        className="kit-form min-h-[7.5rem]"
        data-kit-form={KIT_CHECKLIST_FORM.uid}
      />
      <TrustMicroCopy>{TRUST_COPY.checklist}</TrustMicroCopy>
    </div>
  );
}
