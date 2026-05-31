import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    step: "01",
    title: "Download the checklist",
    description:
      "Start with our free prep list—no account required. Work through it at your own pace.",
  },
  {
    step: "02",
    title: "Organize your history",
    description:
      "Build one clear timeline of employers, dates, gaps, and references that matches every form.",
  },
  {
    step: "03",
    title: "Walk in confident",
    description:
      "Apply, interview, and complete screening with aligned records and calm, honest answers.",
  },
];

export function HowItWorksSection() {
  return (
    <Section
      id="how-it-works"
      className="border-y border-slate-100 bg-surface-off-white"
    >
      <SectionHeading
        eyebrow="How it works"
        title="Three steps to screening-ready"
        description="A simple path from anxious to prepared—no overwhelm, no legal jargon."
        align="center"
        className="mx-auto"
      />
      <div className="mt-14 grid gap-10 md:grid-cols-3">
        {steps.map((item) => (
          <div key={item.step} className="text-center md:text-left">
            <span className="font-serif text-5xl font-semibold text-[var(--brand-primary)]">
              {item.step}
            </span>
            <h3 className="mt-4 text-xl font-semibold text-navy-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
