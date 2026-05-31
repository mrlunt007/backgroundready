import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CTAWithTrust } from "@/components/ui/CTAWithTrust";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { TRUST_COPY } from "@/lib/trust-copy";

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
    <section className="dark-section relative py-16 sm:py-24">
      {showBackgroundImage ? (
        <>
          <Image
            src={IMAGES.officeBuildingNight.src}
            alt=""
            fill
            className="object-cover object-center opacity-20"
            sizes="100vw"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--navy-deep)]/90 via-[var(--navy-base)]/85 to-[#141f33]/90"
            aria-hidden
          />
        </>
      ) : null}
      <Container className="relative text-center">
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
          {description}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-start sm:gap-8">
          <CTAWithTrust trust={TRUST_COPY.checklist} trustAlign="center" trustVariant="onDark">
            <Button href={PRIMARY_CTA.href} size="lg">
              {PRIMARY_CTA.label}
            </Button>
          </CTAWithTrust>
          <CTAWithTrust trust={TRUST_COPY.service} trustAlign="center" trustVariant="onDark">
            <Button
              href={SECONDARY_CTA.href}
              variant="secondary"
              size="lg"
              className="border-slate-600 bg-white/10 text-white hover:bg-white/15"
            >
              {SECONDARY_CTA.label}
            </Button>
          </CTAWithTrust>
        </div>
      </Container>
    </section>
  );
}
