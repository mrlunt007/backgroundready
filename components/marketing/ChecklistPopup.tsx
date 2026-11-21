"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ResendChecklistForm } from "@/components/marketing/ResendChecklistForm";
import {
  dismissChecklistPopup,
  hasChecklistRequested,
  isChecklistPopupDismissed,
} from "@/lib/leads/storage";

const EXCLUDED_PATHS = new Set(["/checklist", "/contact"]);

export function ChecklistPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (EXCLUDED_PATHS.has(pathname)) return;
    if (hasChecklistRequested() || isChecklistPopupDismissed()) return;

    setEnabled(true);

    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setOpen(true);
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= 0.5) trigger();
    };

    const timer = window.setTimeout(trigger, 25_000);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  if (!enabled || !open) return null;

  function close() {
    dismissChecklistPopup(7);
    setOpen(false);
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center p-3 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checklist-popup-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-navy-900/50 backdrop-blur-[2px]"
        aria-label="Dismiss checklist offer"
        onClick={close}
      />
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/20 sm:p-6">
        <button
          type="button"
          onClick={close}
          className="absolute right-3 top-3 rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-navy-900"
          aria-label="Close"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <p className="pr-8 text-xs font-semibold uppercase tracking-wider text-brand-700">
          Free checklist
        </p>
        <h2
          id="checklist-popup-title"
          className="mt-2 font-serif text-2xl font-semibold text-navy-900"
        >
          Have a background check coming up?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Get our free 6-page checklist to review your employment history,
          identify potential discrepancies, and prepare for your next background
          check.
        </p>

        <div className="mt-5">
          <ResendChecklistForm
            compact
            source="popup"
            submitLabel="Send Me the Free Checklist"
            onSuccess={() => {
              dismissChecklistPopup(7);
            }}
          />
        </div>
      </div>
    </div>
  );
}
