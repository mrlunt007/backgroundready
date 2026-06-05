import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactEmailLink } from "@/components/ui/ContactEmailLink";
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
        title="Get in touch"
        description="Email us directly and we'll respond within two business days."
        align="split"
        image={{
          src: IMAGES.handshakeOffer.src,
          alt: IMAGES.handshakeOffer.alt,
          aspect: "wide",
        }}
      />

      <Section containerClassName="max-w-2xl">
        <ContactEmailLink withSubject prominent className="w-full sm:w-auto" />

        <ul className="mt-10 space-y-3">
          {contactReasons.map((reason) => (
            <li key={reason} className="flex gap-2 text-sm text-slate-600">
              <span className="text-brand-600" aria-hidden>
                ✓
              </span>
              {reason}
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm text-slate-500">
          For checklist or product issues, include your download email so we can
          find your account faster.
        </p>

        <TrustMicroCopy className="mt-10 border-t border-slate-100 pt-8">
          {TRUST_COPY.checklistEmail}
        </TrustMicroCopy>
      </Section>
    </>
  );
}
