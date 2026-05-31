import type { Metadata } from "next";
import { CTASection } from "@/components/marketing/CTASection";
import { PageHeader } from "@/components/layout/PageHeader";
import { PhilosophySection } from "@/components/marketing/PhilosophySection";
import { IMAGES } from "@/lib/images";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Our Approach",
  seoTitle: "Our Approach to Employment Verification",
  description:
    "BackgroundReady helps qualified candidates get past rigid hiring filters with honest preparation—not resume fiction.",
  path: "/approach",
});

export default function ApproachPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our approach"
        title="Qualified candidates deserve a fair shot at verification"
        description="Hiring filters are rigid. Background checks are slow. We help capable people get organized—not people who need to invent a history."
        align="split"
        image={{
          src: IMAGES.reviewingDocuments.src,
          alt: IMAGES.reviewingDocuments.alt,
          aspect: "wide",
        }}
      />
      <PhilosophySection hideHeading hideImage />
      <CTASection
        title="Talk to us about your situation"
        description="Every career path is different. Contact us and we'll explain how our approach applies to yours."
      />
    </>
  );
}
