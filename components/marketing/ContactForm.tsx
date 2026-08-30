"use client";

import { useForm, ValidationError } from "@formspree/react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { CONTACT_EMAIL } from "@/lib/constants";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;

function SendIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="h-6 w-6 text-brand-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

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
      <Card className="border-brand-200/80 bg-gradient-to-br from-brand-50/80 to-white p-8 sm:p-10">
        <div className="flex items-start gap-4" role="status">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-100">
            <CheckIcon />
          </div>
          <div>
            <p className="font-serif text-2xl text-navy-900">Thank you</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Your message is on its way. We typically respond within two
              business days.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-slate-200/80 p-0 shadow-md shadow-slate-900/[0.06]">
      <div className="border-b border-brand-200/60 bg-gradient-to-r from-brand-50/90 via-white to-brand-50/40 px-6 py-5 sm:px-8 sm:py-6">
        <h2 className="font-serif text-xl text-navy-900 sm:text-2xl">
          Send us a message
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Fill out the form below and we&apos;ll get back to you soon.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 px-6 py-6 sm:space-y-6 sm:px-8 sm:py-8"
        noValidate
      >
        <input
          type="text"
          name="_gotcha"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
        />

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
          <div>
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
          </div>

          <div>
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
          </div>
        </div>

        <div>
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
        </div>

        <div>
          <Textarea
            label="Message"
            id="message"
            name="message"
            required
            rows={5}
            placeholder="How can we help?"
            disabled={state.submitting}
            className="resize-y min-h-[8rem]"
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
            className="mt-1 block text-sm text-red-600"
          />
        </div>

        <ValidationError
          errors={state.errors}
          className="block text-sm text-red-600"
        />

        <div className="border-t border-slate-100 pt-6">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={state.submitting}
            className="w-full shadow-lg shadow-[var(--brand-primary)]/30 sm:w-auto sm:min-w-[11rem]"
          >
            {state.submitting ? (
              "Sending…"
            ) : (
              <>
                Send message
                <SendIcon />
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}
