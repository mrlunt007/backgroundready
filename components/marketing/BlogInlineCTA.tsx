import { Button } from "@/components/ui/Button";
import { CTAWithTrust } from "@/components/ui/CTAWithTrust";
import { PRIMARY_CTA } from "@/lib/constants";
import { TRUST_COPY } from "@/lib/trust-copy";

export function BlogInlineCTA() {
  return (
    <aside
      className="not-prose my-10 rounded-r-xl border border-slate-200/80 border-l-[3px] border-l-[var(--brand-primary)] bg-surface-off-white px-6 py-6 sm:px-8"
      aria-label="Free checklist offer"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-primary)]">
        Free resource
      </p>
      <h3 className="mt-2 font-serif text-xl font-semibold text-navy-900 sm:text-2xl">
        Get the background check readiness checklist
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        A practical prep list to complete before HR runs your screening—organized,
        not scrambling.
      </p>
      <CTAWithTrust trust={TRUST_COPY.checklist} className="mt-5">
        <Button href={PRIMARY_CTA.href} size="md">
          {PRIMARY_CTA.label}
        </Button>
      </CTAWithTrust>
    </aside>
  );
}
