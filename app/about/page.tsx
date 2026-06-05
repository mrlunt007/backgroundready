import type { Metadata } from "next";
import { CTASection } from "@/components/marketing/CTASection";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { ContactEmailLink } from "@/components/ui/ContactEmailLink";
import { SITE_NAME } from "@/lib/constants";
import { ContentImage } from "@/components/ui/ContentImage";
import { ABOUT_VALUES } from "@/lib/placeholders";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${SITE_NAME} and our mission to help job seekers prepare for background checks with confidence.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title={`Helping job seekers face background checks with confidence`}
        description={`${SITE_NAME} was built for people in the middle of a job search—when an offer depends on screening and every detail matters.`}
      />

      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-5 lg:gap-14">
          <ContentImage
            src={IMAGES.officeCollaboration.src}
            alt={IMAGES.officeCollaboration.alt}
            aspect="wide"
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="lg:col-span-2"
          />
          <div className="space-y-6 text-base leading-relaxed text-slate-600 lg:col-span-3">
          <p>
            Background checks can feel like a black box. You&apos;re asked for
            years of history, references who may not remember you, and dates that
            have to match across every form you&apos;ve filled out.
          </p>
          <p>
            We create practical resources—articles, templates, and services—that
            help you organize your story, explain gaps honestly, and show up to
            interviews prepared instead of anxious.
          </p>
          <p>
            Our approach is educational and empowering. We don&apos;t promise to
            fix your record; we help you present it clearly and consistently so
            employers can move your hire forward.
          </p>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {ABOUT_VALUES.map((value) => (
            <Card key={value.title}>
              <h2 className="text-lg font-semibold text-navy-900">{value.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {value.description}
              </p>
            </Card>
          ))}
        </div>

        <Card className="mx-auto mt-12 max-w-3xl border-brand-100 bg-brand-50/50">
          <p className="text-sm font-semibold text-navy-900">Questions for our team?</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            We&apos;re happy to hear from you about our guides, products, or services.
            Email us at <ContactEmailLink className="text-sm" />.
          </p>
        </Card>

        <Card className="mx-auto mt-6 max-w-3xl">
          <p className="text-sm font-semibold text-navy-900">Important note</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Content on {SITE_NAME} is for general educational purposes only and is
            not legal advice. Laws and employer policies vary. Consult a qualified
            professional for guidance specific to your situation.
          </p>
        </Card>
      </Section>

      <CTASection
        title="Ready to get organized?"
        description="Start with our free checklist—a step-by-step prep list you can complete before screening begins."
      />
    </>
  );
}
