import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const boundaries = [
  {
    title: "Government & clearance checks",
    description:
      "Our resources are not designed for federal background investigations, security clearances, or government-contractor screening.",
  },
  {
    title: "Legal or financial fraud",
    description:
      "We will not assist with evading law enforcement, defrauding employers, or verifying information for loans or other financial products.",
  },
  {
    title: "Substitute for legal advice",
    description:
      "Content here is educational. For criminal records, disputes with former employers, or jurisdiction-specific rights, consult a qualified professional.",
  },
];

export function BoundariesSection() {
  return (
    <Section id="boundaries" variant="muted">
      <SectionHeading
        eyebrow="Clear boundaries"
        title="When BackgroundReady is not the right fit"
        description="We are direct about what we offer—and what we will never do. If your situation falls outside these lines, we are not the resource you need."
        align="center"
        className="mx-auto"
      />
      <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-3">
        {boundaries.map((item) => (
          <div
            key={item.title}
            className="flex gap-4 rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm"
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-sm font-bold text-red-600"
              aria-hidden
            >
              ✕
            </span>
            <div>
              <h3 className="font-semibold text-navy-900">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
