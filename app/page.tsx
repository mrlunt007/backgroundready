import { CTASection } from "@/components/marketing/CTASection";
import { FAQSection } from "@/components/marketing/FAQSection";
import { FeaturesSection } from "@/components/marketing/FeaturesSection";
import { HeroSection } from "@/components/marketing/HeroSection";
import { PreviewGridSection } from "@/components/marketing/PreviewGridSection";
import {
  PLACEHOLDER_ARTICLES,
  PLACEHOLDER_PRODUCTS,
  PLACEHOLDER_SERVICES,
} from "@/lib/placeholders";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <PreviewGridSection
        id="products"
        eyebrow="Products"
        title="Guides and templates you can use today"
        description="Digital workbooks and scripts designed for job seekers—not generic HR packets."
        items={PLACEHOLDER_PRODUCTS}
        basePath="/products"
        viewAllHref="/products"
        viewAllLabel="View all products"
        linkLabel="View product"
        variant="muted"
      />
      <PreviewGridSection
        id="services"
        eyebrow="Services"
        title="Personal support when you want a second set of eyes"
        description="One-on-one reviews and practice sessions tailored to your work history and timeline."
        items={PLACEHOLDER_SERVICES}
        basePath="/services"
        viewAllHref="/services"
        viewAllLabel="View all services"
        linkLabel="View service"
      />
      <PreviewGridSection
        id="articles"
        eyebrow="From the blog"
        title="Featured articles"
        description="Clear, actionable reads on background checks, gaps, references, and interviews."
        items={PLACEHOLDER_ARTICLES}
        basePath="/blog"
        viewAllHref="/blog"
        viewAllLabel="View all articles"
        linkLabel="Read article"
        variant="muted"
      />
      <FAQSection />
      <CTASection />
    </>
  );
}
