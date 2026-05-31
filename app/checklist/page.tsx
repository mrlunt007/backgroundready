import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { TrustMicroCopy } from "@/components/ui/TrustMicroCopy";
import { Section } from "@/components/ui/Section";
import { PRIMARY_CTA, SITE_NAME } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { TRUST_COPY } from "@/lib/trust-copy";

export const metadata: Metadata = {
  title: "Free checklist",
  description: `Download the free background-check readiness checklist from ${SITE_NAME}.`,
};

const checklistItems = [
  {
    title: "Work history timeline",
    description: "Every employer, title, location, and start/end date in one place.",
  },
  {
    title: "Gap documentation",
    description: "Brief, honest notes for any period between roles.",
  },
  {
    title: "Reference shortlist",
    description: "Names, roles, relationship, and confirmed contact details.",
  },
  {
    title: "Education & credentials",
    description: "Schools, degrees, certifications, and completion dates.",
  },
  {
    title: "Disclosure prep",
    description: "A private list of items you may need to address proactively.",
  },
  {
    title: "Interview talking points",
    description: "Consistent answers if a recruiter asks about your record.",
  },
];

const benefits = [
  "Works whether you're employed, between jobs, or changing careers",
  "Designed for U.S.-style employment screening (general guidance)",
  "Printable PDF format—coming when email capture launches",
];

export default function ChecklistPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free resource"
        title="Background-check readiness checklist"
        description="A practical prep list to complete before HR runs your screening—so you're organized, not scrambling."
        align="split"
        image={{
          src: IMAGES.reviewingDocuments.src,
          alt: IMAGES.reviewingDocuments.alt,
          aspect: "portrait",
        }}
      />

      <Section containerClassName="max-w-5xl">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-navy-900">
              What you&apos;ll work through
            </h2>
            <ul className="mt-6 space-y-4">
              {checklistItems.map((item, index) => (
                <li key={item.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-800">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-navy-900">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <ul className="mt-8 space-y-2 border-t border-slate-100 pt-8">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex gap-2 text-sm text-slate-600"
                >
                  <span className="text-brand-600" aria-hidden>
                    ✓
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <Card className="h-fit border-brand-200/60 bg-gradient-to-b from-white to-brand-50/30 lg:sticky lg:top-24">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
              Get the checklist
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Enter your email to receive the PDF when delivery goes live. No spam—just
              readiness tips you can use.
            </p>
            <div
              className="mt-6 space-y-4"
              role="group"
              aria-label="Checklist signup (placeholder)"
            >
              <Input
                label="Email address"
                name="email"
                type="email"
                placeholder="you@example.com"
                disabled
              />
              <TrustMicroCopy>{TRUST_COPY.checklistEmail}</TrustMicroCopy>
              <Button disabled className="w-full" size="lg">
                {PRIMARY_CTA.label} (soon)
              </Button>
              <TrustMicroCopy>{TRUST_COPY.checklist}</TrustMicroCopy>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              By signing up, you agree to receive emails from {SITE_NAME}. Unsubscribe
              anytime.
            </p>
          </Card>
        </div>
      </Section>
    </>
  );
}
