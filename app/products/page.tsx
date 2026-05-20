import type { Metadata } from "next";
import { CTASection } from "@/components/marketing/CTASection";
import { PageHeader } from "@/components/layout/PageHeader";
import { PreviewCard } from "@/components/ui/PreviewCard";
import { Section } from "@/components/ui/Section";
import { SITE_NAME } from "@/lib/constants";
import { PLACEHOLDER_PRODUCTS } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "Products",
  description: `Digital guides and templates from ${SITE_NAME} to help you prepare for background checks.`,
};

export default function ProductsIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="Tools you can use before you apply"
        description="Workbooks, templates, and kits designed for job seekers—available via Gumroad when we launch."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PLACEHOLDER_PRODUCTS.map((product) => (
            <PreviewCard
              key={product.slug}
              item={product}
              href="/products"
              linkLabel="Coming soon"
            />
          ))}
        </div>
        <p className="mt-12 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-8 text-center text-sm text-slate-600">
          Checkout via Gumroad will be linked on each product page at{" "}
          <code className="rounded bg-white px-1.5 py-0.5 text-xs text-slate-700">
            /products/[slug]
          </code>
          .
        </p>
      </Section>

      <CTASection
        title="Start free while products roll out"
        description="The readiness checklist covers the essentials—grab it now at no cost."
      />
    </>
  );
}
