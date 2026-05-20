import { CTASection } from "@/components/marketing/CTASection";
import { FAQSection } from "@/components/marketing/FAQSection";
import { FeaturesSection } from "@/components/marketing/FeaturesSection";
import { HeroSection } from "@/components/marketing/HeroSection";
import { PreviewGridSection } from "@/components/marketing/PreviewGridSection";
import { getAllBlogPosts } from "@/lib/content/blog";
import {
  blogPostToPreviewItem,
  pickFeatured,
  productToPreviewItem,
  serviceToPreviewItem,
} from "@/lib/content/preview";
import { getAllProducts } from "@/lib/content/products";
import { getAllServices } from "@/lib/content/services";

export default function HomePage() {
  const featuredPosts = pickFeatured(getAllBlogPosts()).map(blogPostToPreviewItem);
  const featuredProducts = pickFeatured(getAllProducts()).map(productToPreviewItem);
  const featuredServices = pickFeatured(getAllServices()).map(serviceToPreviewItem);

  return (
    <>
      <HeroSection />
      <FeaturesSection />
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
        variant="muted"
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
        eyebrow="From the blog"
        title="Featured articles"
        description="Clear, actionable reads on background checks, gaps, references, and interviews."
        items={featuredPosts}
        basePath="/blog"
        viewAllHref="/blog"
        viewAllLabel="View all articles"
        linkLabel="Read article"
        variant="muted"
        detailPagesEnabled
      />
      <FAQSection />
      <CTASection />
    </>
  );
}
