import { Button } from "@/components/ui/Button";
import { ContactEmailLink } from "@/components/ui/ContactEmailLink";
import { Input } from "@/components/ui/Input";
import { TrustMicroCopy } from "@/components/ui/TrustMicroCopy";
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
          Get screening tips in your inbox
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Practical background-check prep—no spam. Unsubscribe anytime.
        </p>
        <form
          className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end"
          aria-label="Email signup (placeholder)"
        >
          <div className="flex-1">
            <Input
              label="Email address"
              name="email"
              type="email"
              placeholder="you@example.com"
              disabled
            />
          </div>
          <Button disabled className="sm:mb-0.5">
            Subscribe (soon)
          </Button>
        </form>
        <TrustMicroCopy className="mt-3">{TRUST_COPY.checklistEmail}</TrustMicroCopy>
        <p className="mt-4 text-sm text-slate-600">
          Questions? Reach us at <ContactEmailLink className="text-sm font-medium" />.
        </p>
      </div>
    </Section>
  );
}
