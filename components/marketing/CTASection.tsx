import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

type CTASectionProps = {
  title?: string;
  description?: string;
  showBackgroundImage?: boolean;
};

export function CTASection({
  title = "Start preparing tonight",
  description = "Download the free checklist and work through your history, gaps, and references step by step.",
  showBackgroundImage = true,
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-24">
      {showBackgroundImage ? (
        <>
          <Image
            src={IMAGES.officeBuildingNight.src}
            alt=""
            fill
            className="object-cover object-center opacity-30"
            sizes="100vw"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-navy-950/75"
            aria-hidden
          />
        </>
      ) : (
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-brand-600/20 via-transparent to-transparent"
          aria-hidden
        />
      )}
      <Container className="relative text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
          {description}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href={PRIMARY_CTA.href} size="lg">
            {PRIMARY_CTA.label}
          </Button>
          <Button
            href={SECONDARY_CTA.href}
            variant="secondary"
            size="lg"
            className="border-slate-600 bg-transparent text-white hover:bg-white/10"
          >
            {SECONDARY_CTA.label}
          </Button>
        </div>
        <p className="mt-6 text-sm text-slate-500">
          Free to start · No credit card · Unsubscribe anytime
        </p>
      </Container>
    </section>
  );
}
