import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/marketing/CTASection";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PreviewCard } from "@/components/ui/PreviewCard";
import { Section } from "@/components/ui/Section";
import { SITE_NAME } from "@/lib/constants";
import { PLACEHOLDER_SERVICES } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "Services",
  description: `One-on-one background check preparation services from ${SITE_NAME}.`,
};

const processSteps = [
  {
    step: "01",
    title: "Share your timeline",
    description: "Walk us through your work history, gaps, and any concerns before screening.",
  },
  {
    step: "02",
    title: "Get a clear action plan",
    description: "We flag inconsistencies, reference risks, and talking points to practice.",
  },
  {
    step: "03",
    title: "Go in prepared",
    description: "Apply and interview with aligned records and confident answers.",
  },
];

export default function ServicesIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Personal support for your unique situation"
        description="When templates aren't enough, work directly with us to review your history and build a disclosure strategy."
      >
        <Button href="/contact" size="lg">
          Request a consultation
        </Button>
      </PageHeader>

      <Section variant="muted">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PLACEHOLDER_SERVICES.map((service) => (
            <PreviewCard
              key={service.slug}
              item={service}
              href="/services"
              linkLabel="Coming soon"
            />
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-center text-2xl font-bold text-navy-900 sm:text-3xl">
          How it works
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {processSteps.map((item) => (
            <Card key={item.step} className="text-center">
              <span className="text-3xl font-bold text-brand-200">{item.step}</span>
              <h3 className="mt-4 text-lg font-semibold text-navy-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-slate-600">
          Questions?{" "}
          <Link href="/contact" className="font-semibold text-brand-700 hover:text-brand-800">
            Contact {SITE_NAME}
          </Link>{" "}
          to discuss which service fits your timeline.
        </p>
      </Section>

      <CTASection
        title="Not sure where to start?"
        description="Download the free checklist first—then book a service when you're ready for personalized help."
      />
    </>
  );
}
