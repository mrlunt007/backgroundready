import { Button } from "@/components/ui/Button";
import { CTAWithTrust } from "@/components/ui/CTAWithTrust";
import { ContentImage } from "@/components/ui/ContentImage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PRIMARY_CTA } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { TRUST_COPY } from "@/lib/trust-copy";

const principles = [
  {
    label: "Honesty first",
    text: "If you cannot do the job, do not misrepresent yourself. We will never help you invent employers, titles, or credentials.",
  },
  {
    label: "Preparation over gatekeeping",
    text: "If you have the skills but lose out because of a gap, a contract title mismatch, or an unprepared reference—we help you get organized and articulate your real story.",
  },
  {
    label: "Your story, clearly told",
    text: "Career paths are messy. Gaps, layoffs, and agency placements are normal. Screening goes smoother when your records, resume, and references all say the same thing.",
  },
];

export function PhilosophySection() {
  return (
    <Section id="philosophy">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Our approach"
            title="Qualified candidates deserve a fair shot at verification"
            description="Hiring filters are rigid. Background checks are slow. That combination screens out capable people who simply were not ready—not people who lied."
          />
          <ul className="mt-8 space-y-5">
            {principles.map((item) => (
              <li
                key={item.label}
                className="rounded-xl border border-slate-200/80 bg-surface-off-white px-5 py-4"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
          <CTAWithTrust trust={TRUST_COPY.hero} className="mt-8">
            <Button href={PRIMARY_CTA.href} size="lg">
              {PRIMARY_CTA.label}
            </Button>
          </CTAWithTrust>
        </div>
        <ContentImage
          src={IMAGES.officeCollaboration.src}
          alt={IMAGES.officeCollaboration.alt}
          aspect="wide"
          sizes="(max-width: 1024px) 100vw, 520px"
        />
      </div>
    </Section>
  );
}
