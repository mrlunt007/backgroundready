import type { Metadata } from "next";
import { BoundariesSection } from "@/components/marketing/BoundariesSection";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQSection } from "@/components/marketing/FAQSection";
import { FeaturesSection } from "@/components/marketing/FeaturesSection";
import { HeroSection } from "@/components/marketing/HeroSection";
import { HomeJsonLd } from "@/components/marketing/HomeJsonLd";
import { HowItWorksSection } from "@/components/marketing/HowItWorksSection";
import { OutcomeSection } from "@/components/marketing/OutcomeSection";
import { PhilosophySection } from "@/components/marketing/PhilosophySection";
import { PreviewGridSection } from "@/components/marketing/PreviewGridSection";
import { VerificationExplainerSection } from "@/components/marketing/VerificationExplainerSection";
import { getAllBlogPosts } from "@/lib/content/blog";
import {
  blogPostToPreviewItem,
  pickFeatured,
  productToPreviewItem,
  serviceToPreviewItem,
} from "@/lib/content/preview";
import { getAllProducts } from "@/lib/content/products";
import { getAllServices } from "@/lib/content/services";
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
  const featuredProducts = pickFeatured(getAllProducts()).map(productToPreviewItem);
  const featuredServices = pickFeatured(getAllServices()).map(serviceToPreviewItem);

  return (
    <>
      <HomeJsonLd />
      <HeroSection />
      <PhilosophySection />
      <VerificationExplainerSection />
      <HowItWorksSection />
      <FeaturesSection />
      <OutcomeSection />
      <PreviewGridSection
        id="products"
        eyebrow="Products"
        title="Guides and templates you can use today"
        description="Digital workbooks and scripts designed for job seekers—not generic HR packets."
        items={featuredProducts}
        basePath="/products"
        viewAllHref="/products"
        viewAllLabel="View all products"
        linkLabel="View product"
        variant="offWhite"
        detailPagesEnabled
      />
      <PreviewGridSection
        id="services"
        eyebrow="Services"
        title="Personal support when you want a second set of eyes"
        description="One-on-one reviews and practice sessions tailored to your work history and timeline."
        items={featuredServices}
        basePath="/services"
        viewAllHref="/services"
        viewAllLabel="View all services"
        linkLabel="View service"
        detailPagesEnabled
      />
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
        title="Get organized before verification starts"
        description="Download the free checklist and walk through your timeline, gaps, and references step by step—so screening confirms your real story."
      />
    </>
  );
}
