import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PRIMARY_CTA } from "@/lib/constants";

type CTASectionProps = {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function CTASection({
  title = "Get background-check ready",
  description = "Download the free checklist and start preparing with confidence.",
  ctaLabel = PRIMARY_CTA.label,
  ctaHref = PRIMARY_CTA.href,
}: CTASectionProps) {
  return (
    <section className="bg-brand-600 py-16 text-white sm:py-20">
      <Container className="text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-brand-100 sm:text-lg">
          {description}
        </p>
        <div className="mt-8">
          <Button href={ctaHref} variant="secondary" className="text-brand-700">
            {ctaLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
