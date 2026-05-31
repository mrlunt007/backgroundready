import type { Metadata } from "next";
import { BoundariesSection } from "@/components/marketing/BoundariesSection";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQSection } from "@/components/marketing/FAQSection";
import { HeroSection } from "@/components/marketing/HeroSection";
import { HomeJsonLd } from "@/components/marketing/HomeJsonLd";
import { PreviewGridSection } from "@/components/marketing/PreviewGridSection";
import { VerificationPitchSection } from "@/components/marketing/VerificationPitchSection";
import { getAllBlogPosts } from "@/lib/content/blog";
import { blogPostToPreviewItem, pickFeatured } from "@/lib/content/preview";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Employment Background Check Preparation",
  seoTitle: "Pass Employment Verification Checks with Confidence",
  description:
    "Prepare for employment background checks with organized work history, gap explanations, and reference prep. Free checklist and guides for job seekers.",
  seoDescription:
    "Learn how employment verification works and get screening-ready. Organize your work history, explain gaps honestly, and align references before the check starts.",
  path: "/",
});

export default function HomePage() {
  const featuredPosts = pickFeatured(getAllBlogPosts()).map(blogPostToPreviewItem);

  return (
    <>
      <HomeJsonLd />
      <HeroSection />
      <VerificationPitchSection />
      <PreviewGridSection
        id="articles"
        eyebrow="Blog & resources"
        title="Featured articles"
        description="Clear, actionable reads on background checks, gaps, references, and interviews."
        items={featuredPosts}
        basePath="/blog"
        viewAllHref="/blog"
        viewAllLabel="View all articles"
        linkLabel="Read article"
        variant="offWhite"
        cardVariant="blog"
        detailPagesEnabled
      />
      <BoundariesSection />
      <FAQSection />
      <CTASection
        title="Ready to get verified?"
        description="Reach out and we'll walk you through how our verification process works for your situation."
      />
    </>
  );
}
