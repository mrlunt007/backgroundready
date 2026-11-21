"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TrustMicroCopy } from "@/components/ui/TrustMicroCopy";
import { CHECKLIST_PDF_HREF } from "@/lib/constants";
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
  compact = false,
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
  const [downloadUrl, setDownloadUrl] = useState(CHECKLIST_PDF_HREF);

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
        downloadUrl?: string;
        alreadySent?: boolean;
        newsletterConfirmSent?: boolean;
      };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      markChecklistRequested();
      if (data.downloadUrl) setDownloadUrl(data.downloadUrl);
      setStatus("success");
      setMessage(
        data.alreadySent
          ? "We already emailed this checklist recently. You can download it again below."
          : data.newsletterConfirmSent
            ? "Checklist sent. Check your inbox — and confirm the newsletter email if you opted in."
            : "Checklist sent. Check your inbox for the PDF.",
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
          "rounded-xl border border-brand-200/80 bg-gradient-to-br from-brand-50/80 to-white p-5 sm:p-6",
          className,
        )}
        role="status"
      >
        <p className="font-semibold text-navy-900">You&apos;re all set</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{message}</p>
        <Button href={downloadUrl} size="lg" className="mt-4 w-full" download>
          Download Your Free Checklist
        </Button>
        <TrustMicroCopy className="mt-3">{TRUST_COPY.checklistEmail}</TrustMicroCopy>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-4", className)}
      noValidate
    >
      {!compact ? (
        <p className="text-sm text-slate-600">
          Enter your email and we&apos;ll send the 6-page checklist PDF right
          away. Optional newsletter tips are off unless you opt in.
        </p>
      ) : null}

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
        placeholder="you@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        disabled={status === "loading"}
      />

      <label className="flex items-start gap-3 text-sm text-slate-600">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-slate-300 text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
          checked={newsletterOptIn}
          onChange={(event) => setNewsletterOptIn(event.target.checked)}
          disabled={status === "loading"}
        />
        <span>
          Also send occasional readiness tips by email. Unchecked by default —
          checklist delivery does not subscribe you to marketing.
        </span>
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

      <TrustMicroCopy>{TRUST_COPY.checklist}</TrustMicroCopy>
    </form>
  );
}
