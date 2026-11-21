import { ChecklistSignupForm } from "@/components/marketing/ChecklistSignupForm";
import { ContactEmailLink } from "@/components/ui/ContactEmailLink";
import { Section } from "@/components/ui/Section";

export function BlogEmailSignup() {
  return (
    <Section containerClassName="max-w-3xl">
      <div className="rounded-2xl border border-slate-200/80 bg-surface-off-white px-6 py-8 sm:px-10 sm:py-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-primary)]">
          Free checklist
        </p>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-navy-900 sm:text-3xl">
          Ready for Your Next Background Check?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Get our free checklist to review your employment history, spot
          discrepancies, and prepare with confidence. Questions?{" "}
          <ContactEmailLink withSubject className="text-sm" />
        </p>
        <div className="mt-6">
          <ChecklistSignupForm compact source="blog" />
        </div>
      </div>
    </Section>
  );
}
