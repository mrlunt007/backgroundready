import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ContactEmailLink } from "@/components/ui/ContactEmailLink";
import { CTAWithTrust } from "@/components/ui/CTAWithTrust";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TRUST_COPY } from "@/lib/trust-copy";

const freezeIncludes = [
  "The Work Number (Equifax) freeze walkthrough",
  "LexisNexis screening database freeze",
  "Document checklist and identity-match tips",
  "When to lift freezes during a real background check",
];

export function VerificationFreezeServiceSection() {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Paid service"
            title="We'll help you freeze TWN, LexisNexis, and more"
            description="Employment databases store your work history and income without a clear opt-in. We guide you through placing freezes—step by step—so you're not doing it alone."
          />
          <ul className="mt-8 space-y-3">
            {freezeIncludes.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-slate-600">
                <span className="text-brand-600" aria-hidden>
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Card className="border-brand-200/60 bg-gradient-to-br from-brand-50/40 to-white p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
            Pricing
          </p>
          <div className="mt-4 space-y-4">
            <div className="rounded-xl border border-slate-200/80 bg-white px-4 py-4">
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-semibold text-navy-900">Single bureau</p>
                <p className="text-2xl font-bold text-navy-900">$25</p>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                One database—The Work Number, LexisNexis, or similar.
              </p>
            </div>
            <div className="rounded-xl border border-brand-200 bg-white px-4 py-4">
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-semibold text-navy-900">Multi-bureau package</p>
                <p className="text-2xl font-bold text-navy-900">$50</p>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                Two or more—e.g. TWN + LexisNexis—with guidance on related databases.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <CTAWithTrust trust={TRUST_COPY.contact}>
              <Button href="/services/employment-data-freeze" size="lg" className="w-full sm:w-auto">
                View service details
              </Button>
            </CTAWithTrust>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Ready to book? Email <ContactEmailLink className="text-sm" /> and
            tell us which bureau you want frozen.
          </p>
        </Card>
      </div>
      <p className="mt-8 text-center text-sm text-slate-600">
        Prefer DIY? Read our free guide:{" "}
        <Link
          href="/blog/how-to-freeze-your-work-number-step-by-step"
          className="font-semibold text-[var(--brand-primary)] hover:text-[var(--brand-primary-hover)]"
        >
          How to freeze The Work Number
        </Link>
      </p>
    </Section>
  );
}
