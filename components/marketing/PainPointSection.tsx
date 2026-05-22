import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ContentImage } from "@/components/ui/ContentImage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PRIMARY_CTA } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

const painPoints = [
  "Dates on your resume don't match what HR has on file",
  "You're not sure how to explain a gap without saying too much",
  "References haven't been warned a verifier might call",
  "Every form asks for something you haven't looked up in years",
];

export function PainPointSection() {
  return (
    <Section variant="muted">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <ContentImage
          src={IMAGES.laptopConfused.src}
          alt={IMAGES.laptopConfused.alt}
          aspect="portrait"
          sizes="(max-width: 1024px) 100vw, 480px"
          className="order-2 lg:order-1"
        />
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Sound familiar?"
            title="Screening stress usually isn't about hiding something—it's about being unprepared"
            description="Most delays come from small inconsistencies and missing paperwork, not dramatic surprises. We help you fix that before anyone calls your old manager."
          />
          <ul className="mt-8 space-y-4">
            {painPoints.map((point) => (
              <li
                key={point}
                className="flex gap-3 rounded-lg border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm"
              >
                <span className="text-brand-600 font-bold" aria-hidden>
                  —
                </span>
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Button>
            <Link
              href="/blog"
              className="text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              Read free guides →
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
