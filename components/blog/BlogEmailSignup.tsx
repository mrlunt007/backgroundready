import { Button } from "@/components/ui/Button";
import { ContactEmailLink } from "@/components/ui/ContactEmailLink";
import { Section } from "@/components/ui/Section";
import { CONTACT_MAILTO_CHECKLIST_HREF } from "@/lib/constants";
import { TRUST_COPY } from "@/lib/trust-copy";

export function BlogEmailSignup() {
  return (
    <Section containerClassName="max-w-3xl">
      <div className="rounded-2xl border border-slate-200/80 bg-surface-off-white px-6 py-8 sm:px-10 sm:py-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-primary)]">
          Stay ready
        </p>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-navy-900 sm:text-3xl">
          Want the free checklist or have a question?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Email us for the background-check readiness checklist, screening tips,
          or help with your situation. We respond within two business days.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button href={CONTACT_MAILTO_CHECKLIST_HREF} size="lg">
            Email for the checklist
          </Button>
          <ContactEmailLink withSubject className="text-center text-sm sm:px-4" />
        </div>
        <p className="mt-4 text-xs text-slate-500">{TRUST_COPY.checklistEmail}</p>
      </div>
    </Section>
  );
}
