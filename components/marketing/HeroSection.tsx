import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ContentImage } from "@/components/ui/ContentImage";
import { CTAWithTrust } from "@/components/ui/CTAWithTrust";
import {
  PRIMARY_CTA,
  SECONDARY_CTA,
  SITE_NAME,
} from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { TRUST_COPY } from "@/lib/trust-copy";

const trustPoints = [
  "Built for real work history—not resume fiction",
  "Guides on gaps, contracts, and reference prep",
  "Free checklist to start before screening begins",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-surface-off-white via-white to-[var(--brand-subtle)]/40">
      <div
        className="pointer-events-none absolute -right-20 top-0 h-96 w-96 rounded-full bg-[var(--brand-muted)]/40 blur-3xl"
        aria-hidden
      />
      <Container className="relative py-16 sm:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center rounded-full border border-[var(--brand-border)] bg-[var(--brand-subtle)] px-4 py-1.5 text-sm font-medium text-[var(--brand-primary-dark)]">
              Passing employment verification
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-navy-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
              Get past the background check{" "}
              <span className="text-[var(--brand-primary-dark)]">
                with a story that holds up
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl lg:mx-0 mx-auto">
              {SITE_NAME} helps job seekers organize real work history, explain gaps
              honestly, and align references—so employment verification confirms
              what you already know is true.
            </p>

            <ul className="mt-8 space-y-3 text-left lg:mx-0 mx-auto max-w-md lg:max-w-none">
              {trustPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm font-medium text-slate-700 sm:text-base"
                >
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--brand-primary)] text-xs text-white"
                    aria-hidden
                  >
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col items-stretch gap-5 sm:flex-row sm:items-start sm:gap-8 lg:justify-start">
              <CTAWithTrust
                trust={TRUST_COPY.hero}
                trustAlign="center"
                className="sm:text-left lg:[&_p]:text-left [&_p]:text-center"
              >
                <Button href={PRIMARY_CTA.href} size="lg" className="w-full sm:w-auto">
                  {PRIMARY_CTA.label}
                </Button>
              </CTAWithTrust>
              <CTAWithTrust
                trust={TRUST_COPY.service}
                trustAlign="center"
                className="sm:text-left lg:[&_p]:text-left [&_p]:text-center"
              >
                <Button href={SECONDARY_CTA.href} variant="outline" size="lg" className="w-full sm:w-auto">
                  {SECONDARY_CTA.label}
                </Button>
              </CTAWithTrust>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <ContentImage
              src={IMAGES.laptopWorking.src}
              alt={IMAGES.laptopWorking.alt}
              priority
              aspect="portrait"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
            <div className="absolute -bottom-4 -left-2 hidden max-w-[12rem] rounded-xl border border-slate-200/90 bg-white p-3 shadow-lg shadow-slate-900/10 sm:block lg:-left-6">
              <p className="text-xs font-semibold text-navy-900">Screening-ready</p>
              <p className="mt-1 text-xs leading-snug text-slate-500">
                One timeline. Aligned references. Calm, honest answers.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
