"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);

  async function handleUnsubscribe() {
    if (!token) {
      setStatus("error");
      setMessage("Missing unsubscribe token.");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/leads/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "Unsubscribe failed.");
        return;
      }
      setStatus("success");
      setMessage("You have been unsubscribed. We won’t email you again.");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <section className="border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
      <Container className="py-16 sm:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-3xl font-semibold text-navy-900">Unsubscribe</h1>
          <p className="mt-4 text-base text-slate-600">
            You can stop receiving BackgroundReady emails at any time.
          </p>

          {status === "success" ? (
            <p className="mt-6 text-sm text-slate-600" role="status">
              {message}
            </p>
          ) : (
            <div className="mt-8 space-y-4">
              {status === "error" && message ? (
                <p className="text-sm text-red-600" role="alert">
                  {message}
                </p>
              ) : null}
              <Button
                type="button"
                onClick={handleUnsubscribe}
                disabled={status === "loading" || !token}
              >
                {status === "loading" ? "Unsubscribing…" : "Confirm unsubscribe"}
              </Button>
            </div>
          )}

          <div className="mt-8">
            <Button href="/" variant="outline">
              Back to home
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense
      fallback={
        <Container className="py-16">
          <p className="text-center text-slate-600">Loading…</p>
        </Container>
      }
    >
      <UnsubscribeContent />
    </Suspense>
  );
}
