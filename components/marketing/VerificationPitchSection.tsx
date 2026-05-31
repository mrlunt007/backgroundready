import { Button } from "@/components/ui/Button";
import { CTAWithTrust } from "@/components/ui/CTAWithTrust";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TRUST_COPY } from "@/lib/trust-copy";

const helpPoints = [
  {
    title: "Employment verification support",
    description:
      "We help you navigate the verification process so employers receive consistent, confirmable information about your work history.",
  },
  {
    title: "Contract & agency placements",
    description:
      "Staffing and contract roles often verify through the agency—not the client company. We know where checks go and how to prepare.",
  },
  {
    title: "Gaps and timeline alignment",
    description:
      "If screening is stalling because of a gap, title mismatch, or unprepared reference, we help you get organized before the call.",
  },
];

export function VerificationPitchSection() {
  return (
    <Section>
      <SectionHeading
        eyebrow="What we do"
        title="We can help you get verified"
        description="Our process is built for job seekers who have the skills but need help getting past employment verification—not for inventing a history you don't have."
        align="center"
        className="mx-auto"
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {helpPoints.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-slate-200/90 bg-surface-off-white p-6"
          >
            <h3 className="text-lg font-semibold text-navy-900">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {item.description}
            </p>
          </article>
        ))}
      </div>
      <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
        <CTAWithTrust trust={TRUST_COPY.contact} trustAlign="center">
          <Button href="/contact" size="lg">
            Contact us
          </Button>
        </CTAWithTrust>
        <Button href="/verification" variant="outline" size="lg">
          How verification works
        </Button>
      </div>
    </Section>
  );
}
