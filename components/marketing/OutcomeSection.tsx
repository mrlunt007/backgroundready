import { Button } from "@/components/ui/Button";
import { ContentImage } from "@/components/ui/ContentImage";
import { Section } from "@/components/ui/Section";
import { SECONDARY_CTA } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

const outcomes = [
  {
    title: "Organized records",
    description: "One timeline you can trust on every application and form.",
  },
  {
    title: "Clear explanations",
    description: "Honest, brief language for gaps and career changes.",
  },
  {
    title: "Confident conversations",
    description: "Practice answers so screening calls feel routine, not risky.",
  },
];

export function OutcomeSection() {
  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
            The outcome you want
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
            Walk into the handshake already knowing your story
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            When your history is organized and your references are briefed, employers
            move faster—and you stop waiting in limbo between offer and start date.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {outcomes.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-brand-100 bg-brand-50/40 px-4 py-3"
              >
                <p className="font-semibold text-navy-900">{item.title}</p>
                <p className="mt-1 text-sm text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
          <Button href={SECONDARY_CTA.href} className="mt-8" size="lg">
            {SECONDARY_CTA.label}
          </Button>
        </div>
        <ContentImage
          src={IMAGES.handshakeOutdoor.src}
          alt={IMAGES.handshakeOutdoor.alt}
          aspect="wide"
          sizes="(max-width: 1024px) 100vw, 520px"
        />
      </div>
    </Section>
  );
}
