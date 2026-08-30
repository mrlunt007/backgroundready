"use client";

import { useForm, ValidationError } from "@formspree/react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { CONTACT_EMAIL } from "@/lib/constants";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;

export function ContactForm() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID ?? "");

  if (!FORMSPREE_ID) {
    return (
      <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Contact form is not configured yet. Email us at{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-medium underline underline-offset-2"
        >
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    );
  }

  if (state.succeeded) {
    return (
      <div
        className="rounded-xl border border-brand-200 bg-brand-50/60 px-5 py-6"
        role="status"
      >
        <p className="font-serif text-xl text-navy-900">Thank you</p>
        <p className="mt-2 text-sm text-slate-600">
          Your message is on its way. We typically respond within two business
          days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Formspree honeypot — leave empty */}
      <input
        type="text"
        name="_gotcha"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />

      <Input
        label="Name"
        id="name"
        name="name"
        type="text"
        autoComplete="name"
        required
        placeholder="Your name"
        disabled={state.submitting}
      />
      <ValidationError
        prefix="Name"
        field="name"
        errors={state.errors}
        className="mt-1 block text-sm text-red-600"
      />

      <Input
        label="Email"
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="you@example.com"
        disabled={state.submitting}
      />
      <ValidationError
        prefix="Email"
        field="email"
        errors={state.errors}
        className="mt-1 block text-sm text-red-600"
      />

      <Input
        label="Phone (optional)"
        id="phone"
        name="phone"
        type="tel"
        autoComplete="tel"
        placeholder="(555) 555-5555"
        disabled={state.submitting}
      />
      <ValidationError
        prefix="Phone"
        field="phone"
        errors={state.errors}
        className="mt-1 block text-sm text-red-600"
      />

      <Textarea
        label="Message"
        id="message"
        name="message"
        required
        rows={5}
        placeholder="How can we help?"
        disabled={state.submitting}
      />
      <ValidationError
        prefix="Message"
        field="message"
        errors={state.errors}
        className="mt-1 block text-sm text-red-600"
      />

      <ValidationError
        errors={state.errors}
        className="block text-sm text-red-600"
      />

      <Button type="submit" size="lg" disabled={state.submitting} className="w-full sm:w-auto">
        {state.submitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
