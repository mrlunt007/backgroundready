import { Button } from "@/components/ui/Button";
import { CTAWithTrust } from "@/components/ui/CTAWithTrust";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TRUST_COPY } from "@/lib/trust-copy";

const steps = [
  "We review your work history, gaps, and the roles you're targeting.",
  "We identify where verifiers will call and what they'll ask.",
  "We help you align your records, references, and answers before screening starts.",
];

export function VerificationHelpSection() {
  return (
    <Section variant="muted">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Our process"
          title="How we help you pass verification"
          description="Verification delays usually come from mismatched records—not from employers discovering something dramatic. We fix the mismatches before they become problems."
          align="center"
          className="mx-auto"
        />
        <ol className="mt-10 space-y-4">
          {steps.map((step, index) => (
            <li
              key={step}
              className="flex gap-4 rounded-xl border border-slate-200/80 bg-white px-5 py-4"
            >
              <span className="font-serif text-2xl font-semibold text-[var(--brand-primary)]">
                {index + 1}
              </span>
              <p className="pt-1 text-sm leading-relaxed text-slate-600">{step}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex justify-center">
          <CTAWithTrust trust={TRUST_COPY.contact}>
            <Button href="/contact" size="lg">
              Get started
            </Button>
          </CTAWithTrust>
        </div>
      </div>
    </Section>
  );
}
