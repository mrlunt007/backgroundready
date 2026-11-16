import { ChecklistSignupForm } from "@/components/marketing/ChecklistSignupForm";
import { ContactEmailLink } from "@/components/ui/ContactEmailLink";
import { Section } from "@/components/ui/Section";
import { TRUST_COPY } from "@/lib/trust-copy";

export function BlogEmailSignup() {
  return (
    <Section containerClassName="max-w-3xl">
      <div className="rounded-2xl border border-slate-200/80 bg-surface-off-white px-6 py-8 sm:px-10 sm:py-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-primary)]">
          Stay ready
        </p>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-navy-900 sm:text-3xl">
          Want the free checklist?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Enter your email and we&apos;ll send a confirmation with the
          background-check readiness checklist PDF. Prefer to ask a question?{" "}
          <ContactEmailLink withSubject className="text-sm" />
        </p>
        <div className="mt-6">
          <ChecklistSignupForm compact />
        </div>
        <p className="mt-4 text-xs text-slate-500">{TRUST_COPY.checklistEmail}</p>
      </div>
    </Section>
  );
}
