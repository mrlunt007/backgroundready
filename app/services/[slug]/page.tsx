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
  getAllServiceSlugs,
  getServiceBySlug,
  getServiceWithContent,
} from "@/lib/content/services";
import { createMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return createMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
    seoTitle: service.seoTitle,
    seoDescription: service.seoDescription,
  });
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceWithContent(slug);
  if (!service) notFound();

  return (
    <>
      <div className="border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
        <Container className="py-14 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/services"
              className="text-sm font-medium text-brand-700 hover:text-brand-800"
            >
              ← Back to services
            </Link>
            {service.featured ? (
              <Badge variant="brand" className="mt-6">
                Most requested
              </Badge>
            ) : null}
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
              {service.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {service.description}
            </p>
            <Button href={service.ctaUrl} size="lg" className="mt-8">
              {service.ctaLabel}
            </Button>
          </div>
        </Container>
      </div>

      <Section>
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-10">
              <Prose>{service.content}</Prose>

              {service.processSteps.length > 0 ? (
                <div>
                  <h2 className="text-xl font-bold text-navy-900">How it works</h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {service.processSteps.map((step, index) => (
                      <Card key={step.title}>
                        <span className="text-sm font-bold text-brand-600">
                          Step {index + 1}
                        </span>
                        <h3 className="mt-2 font-semibold text-navy-900">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-sm text-slate-600">
                          {step.description}
                        </p>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="space-y-6">
              {service.pricing.map((tier) => (
                <Card key={tier.name} className="border-brand-100">
                  <p className="text-sm font-semibold text-brand-700">{tier.name}</p>
                  <p className="mt-1 text-2xl font-bold text-navy-900">{tier.price}</p>
                  <p className="mt-2 text-sm text-slate-600">{tier.description}</p>
                  {tier.features.length > 0 ? (
                    <ul className="mt-4 space-y-2">
                      {tier.features.map((feature) => (
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
                  ) : null}
                </Card>
              ))}

              {service.deliverables.length > 0 ? (
                <Card>
                  <h2 className="text-lg font-semibold text-navy-900">
                    Deliverables
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm text-slate-600"
                      >
                        <span className="text-brand-600" aria-hidden>
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              ) : null}

              {service.idealFor.length > 0 ? (
                <Card>
                  <h2 className="text-lg font-semibold text-navy-900">Ideal for</h2>
                  <ul className="mt-4 space-y-2">
                    {service.idealFor.map((item) => (
                      <li key={item} className="text-sm text-slate-600">
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              ) : null}

              <Button href={service.ctaUrl} className="w-full">
                {service.ctaLabel}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <CTASection
        title="Want a lighter start?"
        description="Download the free checklist first, then book a service when you're ready for personalized help."
      />
    </>
  );
}
