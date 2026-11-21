"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

function ConfirmContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("Confirming your subscription…");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Missing confirmation token.");
      return;
    }

    let cancelled = false;

    async function confirm() {
      try {
        const response = await fetch("/api/leads/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = (await response.json()) as { error?: string };
        if (cancelled) return;
        if (!response.ok) {
          setStatus("error");
          setMessage(data.error ?? "Confirmation failed.");
          return;
        }
        setStatus("success");
        setMessage("You're confirmed. Welcome to the BackgroundReady newsletter.");
      } catch {
        if (!cancelled) {
          setStatus("error");
          setMessage("Network error. Please try again.");
        }
      }
    }

    void confirm();
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <section className="border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
      <Container className="py-16 sm:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-3xl font-semibold text-navy-900">
            Newsletter confirmation
          </h1>
          <p
            className={`mt-4 text-base ${
              status === "error" ? "text-red-600" : "text-slate-600"
            }`}
            role="status"
          >
            {message}
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button href="/">Back to home</Button>
            <Button href="/checklist" variant="outline">
              Get the checklist
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense
      fallback={
        <Container className="py-16">
          <p className="text-center text-slate-600">Loading…</p>
        </Container>
      }
    >
      <ConfirmContent />
    </Suspense>
  );
}
