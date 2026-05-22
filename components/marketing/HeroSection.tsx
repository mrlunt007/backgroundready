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
import { TRUST_STATS } from "@/lib/placeholders";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-slate-50 via-white to-brand-50/40">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-100/40 via-transparent to-transparent"
        aria-hidden
      />
      <Container className="relative py-16 sm:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center rounded-full border border-brand-200/60 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-800">
              {SITE_TAGLINE}
            </p>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              Walk into your background check{" "}
              <span className="text-brand-700">fully prepared</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl lg:mx-0 mx-auto">
              {SITE_NAME} helps job seekers organize work history, explain employment
              gaps, prepare references, and build interview confidence—before
              screening slows your offer.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Button href={PRIMARY_CTA.href} size="lg">
                {PRIMARY_CTA.label}
              </Button>
              <Button href={SECONDARY_CTA.href} variant="outline" size="lg">
                {SECONDARY_CTA.label}
              </Button>
            </div>
          </div>

          <ContentImage
            src={IMAGES.handshakeOffer.src}
            alt={IMAGES.handshakeOffer.alt}
            priority
            aspect="portrait"
            sizes="(max-width: 1024px) 100vw, 560px"
            className="mx-auto w-full max-w-md lg:max-w-none"
          />
        </div>

        <dl className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-slate-200/80 pt-10 sm:gap-8 lg:max-w-none">
          {TRUST_STATS.map((stat) => (
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
