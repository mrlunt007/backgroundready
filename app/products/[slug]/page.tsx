import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/marketing/CTASection";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import {
  getAllProductSlugs,
  getProductBySlug,
  getProductWithContent,
} from "@/lib/content/products";
import { createMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return createMetadata({
    title: product.title,
    description: product.description,
    path: `/products/${product.slug}`,
    seoTitle: product.seoTitle,
    seoDescription: product.seoDescription,
  });
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductWithContent(slug);
  if (!product) notFound();

  return (
    <>
      <div className="border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
        <Container className="py-14 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/products"
              className="text-sm font-medium text-brand-700 hover:text-brand-800"
            >
              ← Back to products
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Badge variant="brand">{product.category}</Badge>
              {product.featured ? <Badge>Popular</Badge> : null}
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
              {product.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {product.description}
            </p>
            <p className="mt-4 text-2xl font-bold text-navy-900">
              {product.priceDisplay}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={product.gumroadUrl} external size="lg">
                Buy on Gumroad
              </Button>
              <Button href="/checklist" variant="outline" size="lg">
                Get free checklist
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <Section>
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Prose>{product.content}</Prose>
          </div>
          <Card className="h-fit lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold text-navy-900">Included</h2>
            <ul className="mt-4 space-y-3">
              {product.features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-2 text-sm text-slate-600"
                >
                  <span className="text-brand-600" aria-hidden>
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              href={product.gumroadUrl}
              external
              className="mt-6 w-full"
            >
              Buy on Gumroad
            </Button>
            <p className="mt-3 text-xs text-slate-500">
              Placeholder checkout URL until Gumroad products are connected.
            </p>
          </Card>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
