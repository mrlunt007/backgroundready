import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FEATURES } from "@/lib/placeholders";

export function FeaturesSection() {
  return (
    <Section id="features">
      <SectionHeading
        eyebrow="Why BackgroundReady"
        title="Everything you need to get screening-ready"
        description="Practical guidance built for real job seekers—not corporate HR departments."
        align="center"
        className="mx-auto"
      />
      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="flex gap-4">
            <FeatureIcon name={feature.icon} />
            <div>
              <h3 className="font-semibold text-navy-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
