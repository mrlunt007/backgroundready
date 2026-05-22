import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ContentImage } from "@/components/ui/ContentImage";
import {
  PRIMARY_CTA,
  SECONDARY_CTA,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/constants";
import { IMAGES } from "@/lib/images";

const trustPoints = [
  "Built for job seekers—not HR departments",
  "Plain-language guides, not legal jargon",
  "Free checklist to start tonight",
];

const heroStats = [
  { value: "3", label: "Ways to prepare" },
  { value: "Free", label: "Checklist included" },
  { value: "100%", label: "Offer-focused" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-slate-50 via-white to-brand-50/50">
      <div
        className="pointer-events-none absolute -right-20 top-0 h-96 w-96 rounded-full bg-brand-100/50 blur-3xl"
        aria-hidden
      />
      <Container className="relative py-16 sm:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center rounded-full border border-brand-200/60 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-800">
              {SITE_TAGLINE}
            </p>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              Don&apos;t let a background check{" "}
              <span className="text-brand-700">pause your offer</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl lg:mx-0 mx-auto">
              {SITE_NAME} gives you a clear system to organize work history, explain
              gaps, prep references, and show up confident—before screening starts.
            </p>

            <ul className="mt-8 space-y-3 text-left lg:mx-0 mx-auto max-w-md lg:max-w-none">
              {trustPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm font-medium text-slate-700 sm:text-base"
                >
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs text-white"
                    aria-hidden
                  >
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Button href={PRIMARY_CTA.href} size="lg">
                {PRIMARY_CTA.label}
              </Button>
              <Button href={SECONDARY_CTA.href} variant="outline" size="lg">
                {SECONDARY_CTA.label}
              </Button>
            </div>
            <p className="mt-4 text-xs text-slate-500 lg:text-left text-center">
              No account required · Educational resources · Start in minutes
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <ContentImage
              src={IMAGES.laptopWorking.src}
              alt={IMAGES.laptopWorking.alt}
              priority
              aspect="portrait"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
            <div className="absolute -bottom-4 -left-2 hidden max-w-[11rem] rounded-xl border border-slate-200/90 bg-white p-3 shadow-lg shadow-slate-900/10 sm:block lg:-left-6">
              <p className="text-xs font-semibold text-navy-900">Your prep hub</p>
              <p className="mt-1 text-xs leading-snug text-slate-500">
                Checklists, guides &amp; one-on-one help in one place.
              </p>
            </div>
          </div>
        </div>

        <dl className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-slate-200/80 pt-10 sm:gap-8 lg:max-w-none">
          {heroStats.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <dt className="text-2xl font-bold text-navy-900 sm:text-3xl">
                {stat.value}
              </dt>
              <dd className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
