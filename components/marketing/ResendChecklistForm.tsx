"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TrustMicroCopy } from "@/components/ui/TrustMicroCopy";
import { markChecklistRequested } from "@/lib/leads/storage";
import { TRUST_COPY } from "@/lib/trust-copy";
import { cn } from "@/lib/utils";

type ResendChecklistFormProps = {
  compact?: boolean;
  className?: string;
  source?: "checklist_page" | "popup" | "blog" | "other";
  submitLabel?: string;
  onSuccess?: () => void;
};

type FormStatus = "idle" | "loading" | "success" | "error";

export function ResendChecklistForm({
  className,
  source = "checklist_page",
  submitLabel = "Get My Free Checklist",
  onSuccess,
}: ResendChecklistFormProps) {
  const [email, setEmail] = useState("");
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);

    try {
      const response = await fetch("/api/leads/checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          newsletterOptIn,
          source,
          company,
        }),
      });

      const data = (await response.json()) as {
        error?: string;
        alreadySent?: boolean;
        newsletterConfirmSent?: boolean;
      };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      markChecklistRequested();
      setStatus("success");
      setMessage(
        data.alreadySent
          ? "We've already sent this checklist to your inbox recently. Please check your email to download the PDF."
          : data.newsletterConfirmSent
            ? "We've sent your free Background Check Readiness Checklist to your inbox. Please also confirm the newsletter email if you opted in."
            : "We've sent your free Background Check Readiness Checklist to your inbox. Please check your email to download the PDF.",
      );
      onSuccess?.();
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-2xl border border-brand-200/70 bg-gradient-to-br from-brand-50/90 to-white p-5 text-center sm:p-6",
          className,
        )}
        role="status"
      >
        <div
          className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-brand-800"
          aria-hidden
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.25}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <p className="mt-4 font-serif text-xl font-semibold text-navy-900">
          Check your email
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{message}</p>
        <p className="mt-3 text-xs leading-relaxed text-slate-500">
          If you don&apos;t see it, check your spam or promotions folder.
        </p>
        <TrustMicroCopy className="mt-4">{TRUST_COPY.checklistEmail}</TrustMicroCopy>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-4", className)}
      noValidate
    >
      <input
        type="text"
        name="company"
        value={company}
        onChange={(event) => setCompany(event.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />

      <Input
        label="Email"
        id={`checklist-email-${source}`}
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        disabled={status === "loading"}
        className="rounded-xl border-slate-200/90 bg-white/90 py-3 shadow-sm backdrop-blur-sm"
      />

      <label className="flex items-start gap-3 text-sm leading-relaxed text-slate-600">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-slate-300 text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
          checked={newsletterOptIn}
          onChange={(event) => setNewsletterOptIn(event.target.checked)}
          disabled={status === "loading"}
        />
        <span>Send me occasional background check tips, too.</span>
      </label>

      {status === "error" && message ? (
        <p className="text-sm text-red-600" role="alert">
          {message}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending…" : submitLabel}
      </Button>

      <TrustMicroCopy align="center" className="mt-3 text-center">
        Free PDF delivered to your inbox.{" "}
        <Link
          href="/privacy"
          className="underline decoration-slate-300 underline-offset-2 hover:text-navy-900"
        >
          Privacy Policy
        </Link>
      </TrustMicroCopy>
    </form>
  );
}
