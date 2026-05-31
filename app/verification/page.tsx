import type { Metadata } from "next";
import { CTASection } from "@/components/marketing/CTASection";
import { PageHeader } from "@/components/layout/PageHeader";
import { VerificationExplainerSection } from "@/components/marketing/VerificationExplainerSection";
import { VerificationHelpSection } from "@/components/marketing/VerificationHelpSection";
import { VIDEOS } from "@/lib/images";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Employment Verification",
  seoTitle: "How Employment Verification Works",
  description:
    "Learn how employment background checks verify work history, where verifiers call, and how BackgroundReady helps you get verified.",
  path: "/verification",
});

export default function VerificationPage() {
  const typingVideo = VIDEOS.typingOnLaptop;

  return (
    <>
      <PageHeader
        eyebrow="Passing verification"
        title="How employment verification works—and how we help"
        description="Most checks don't go where you expect. Understanding the process is the first step to getting verified without delays."
        align="split"
        video={{
          src: typingVideo.src,
          alt: typingVideo.alt,
          poster: typingVideo.poster,
          aspect: "portrait",
        }}
      />
      <VerificationExplainerSection />
      <VerificationHelpSection />
      <CTASection
        title="Ready to get verified?"
        description="Contact us to learn how our verification process applies to your work history and timeline."
      />
    </>
  );
}
