import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ContactEmailLink } from "@/components/ui/ContactEmailLink";
import { CTAWithTrust } from "@/components/ui/CTAWithTrust";
import { Input } from "@/components/ui/Input";
import { TrustMicroCopy } from "@/components/ui/TrustMicroCopy";
import { Section } from "@/components/ui/Section";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { getOrganizationSchema } from "@/lib/seo/organization-schema";
import { TRUST_COPY } from "@/lib/trust-copy";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${SITE_NAME} team at ${CONTACT_EMAIL}.`,
};

const contactReasons = [
  "Questions about products or services",
  "Partnership or media inquiries",
  "Feedback on articles and guides",
  "Help with your checklist download",
];

export default function ContactPage() {
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${SITE_NAME}`,
    url: `${SITE_URL}/contact`,
    description: `Contact the ${SITE_NAME} team.`,
    mainEntity: getOrganizationSchema(),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <PageHeader
        eyebrow="Contact"
        title="We'd like to hear from you"
        description="Whether you're preparing for a check or exploring our resources, reach out and we'll get back to you."
        align="split"
        image={{
          src: IMAGES.handshakeOffer.src,
          alt: IMAGES.handshakeOffer.alt,
          aspect: "wide",
        }}
      />

      <Section containerClassName="max-w-5xl">
        <Card className="mb-10 border-brand-200/60 bg-gradient-to-br from-brand-50/50 to-white p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
            Email us directly
          </p>
          <p className="mt-2 text-base text-slate-600">
            The fastest way to reach our team:
          </p>
          <ContactEmailLink className="mt-3 block text-xl sm:text-2xl" />
          <p className="mt-3 text-sm text-slate-500">
            We respond to most messages within two business days.
          </p>
        </Card>

        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-navy-900">Get in touch</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Prefer email? Use the address above or the button below to open your
              mail client.
            </p>
            <ContactEmailLink className="mt-4 inline-block text-base" />

            <ul className="mt-8 space-y-3">
              {contactReasons.map((reason) => (
                <li
                  key={reason}
                  className="flex gap-2 text-sm text-slate-600"
                >
                  <span className="text-brand-600" aria-hidden>
                    ✓
                  </span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          <Card className="lg:col-span-3">
            <p className="text-sm font-medium text-slate-500">
              Form coming in a later phase
            </p>
            <form className="mt-6 space-y-5" aria-label="Contact form (placeholder)">
              <div className="grid gap-5 sm:grid-cols-2">
                <Input label="First name" name="firstName" placeholder="Jane" disabled />
                <Input label="Last name" name="lastName" placeholder="Doe" disabled />
              </div>
              <Input
                label="Email address"
                name="email"
                type="email"
                placeholder="you@example.com"
                disabled
              />
              <TrustMicroCopy>{TRUST_COPY.checklistEmail}</TrustMicroCopy>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  disabled
                  placeholder="How can we help?"
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-400"
                />
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                <CTAWithTrust trust={TRUST_COPY.contact}>
                  <Button disabled>Send message (soon)</Button>
                </CTAWithTrust>
                <CTAWithTrust trust={TRUST_COPY.checklistEmail} className="sm:pt-0">
                  <Button href={`mailto:${CONTACT_EMAIL}`} variant="outline">
                    Email us directly
                  </Button>
                </CTAWithTrust>
              </div>
            </form>
          </Card>
        </div>
      </Section>
    </>
  );
}
