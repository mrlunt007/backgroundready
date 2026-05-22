import type { Metadata } from "next";
import { CTASection } from "@/components/marketing/CTASection";
import { PageHeader } from "@/components/layout/PageHeader";
import { PreviewCard } from "@/components/ui/PreviewCard";
import { Section } from "@/components/ui/Section";
import { getAllProducts } from "@/lib/content/products";
import { productToPreviewItem } from "@/lib/content/preview";
import { SITE_NAME } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Products",
  description: `Digital guides and templates from ${SITE_NAME} to help you prepare for background checks.`,
};

export default function ProductsIndexPage() {
  const products = getAllProducts();

  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="Tools you can use before you apply"
        description="Workbooks, templates, and kits designed for job seekers—available via Gumroad."
        align="split"
        image={{
          src: IMAGES.officeAtrium.src,
          alt: IMAGES.officeAtrium.alt,
          aspect: "portrait",
        }}
      />

      <Section>
        {products.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <PreviewCard
                key={product.slug}
                item={productToPreviewItem(product)}
                href={`/products/${product.slug}`}
                linkLabel="View product"
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-600">No products available yet.</p>
        )}
      </Section>

      <CTASection
        title="Start free while you explore"
        description="The readiness checklist covers the essentials—grab it now at no cost."
      />
    </>
  );
}
