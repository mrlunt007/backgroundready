import { CTASection } from "@/components/marketing/CTASection";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PRIMARY_CTA, SITE_NAME } from "@/lib/constants";

const features = [
  {
    title: "Clear guidance",
    description:
      "Straightforward articles on what employers look for and how to prepare your records.",
  },
  {
    title: "Practical tools",
    description:
      "Templates and checklists you can use before you apply or accept an offer.",
  },
  {
    title: "Expert help",
    description:
      "Services for deeper review when you want personalized support.",
  },
];

const comingSoon = [
  {
    title: "Blog",
    description: "SEO-focused articles on background checks and hiring readiness.",
    href: "/blog",
    cta: "View blog",
  },
  {
    title: "Products",
    description: "Digital guides and templates available through Gumroad.",
    href: "/products",
    cta: "Browse products",
  },
  {
    title: "Services",
    description: "Consulting and review offers for individuals and teams.",
    href: "/services",
    cta: "See services",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-b from-brand-50 to-white py-16 sm:py-24">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Background check readiness
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Get ready before the background check starts
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600">
            {SITE_NAME} helps job seekers and professionals prepare records,
            paperwork, and expectations—so surprises don&apos;t derail an offer.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Button>
            <Button href="/services" variant="outline">
              Explore services
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Everything in one place"
            description="Articles, products, and services designed to keep you prepared."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title}>
                <h3 className="text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Explore the site"
            description="More content is on the way. Browse placeholders to see what's coming."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {comingSoon.map((item) => (
              <Card key={item.title} className="flex flex-col">
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-slate-600">
                  {item.description}
                </p>
                <Button href={item.href} variant="outline" className="mt-6 w-fit">
                  {item.cta}
                </Button>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
