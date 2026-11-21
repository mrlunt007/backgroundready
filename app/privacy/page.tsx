import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactEmailLink } from "@/components/ui/ContactEmailLink";
import { Container } from "@/components/ui/Container";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses, and protects your information.`,
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description={`${SITE_NAME} is built for job seekers. This page explains what we collect and why.`}
      />
      <section className="bg-white py-12 sm:py-16">
        <Container className="prose prose-slate max-w-3xl prose-headings:font-serif prose-headings:text-navy-900">
          <p>
            <strong>Last updated:</strong>{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li>
              <strong>Email address</strong> when you request the free checklist,
              subscribe to the newsletter, or contact us.
            </li>
            <li>
              <strong>Optional contact details</strong> you submit through the
              contact form (name, phone, message).
            </li>
            <li>
              <strong>Basic technical data</strong> such as IP address used for
              abuse prevention and rate limiting.
            </li>
          </ul>

          <h2>How we use your information</h2>
          <ul>
            <li>To deliver the free checklist PDF you requested.</li>
            <li>
              To send newsletter tips only after you explicitly opt in and
              confirm your email (double opt-in).
            </li>
            <li>To respond to contact form messages.</li>
            <li>To prevent spam, abuse, and duplicate automated requests.</li>
          </ul>

          <h2>Checklist vs newsletter</h2>
          <p>
            Requesting the checklist does <strong>not</strong> automatically
            subscribe you to marketing emails. Newsletter subscription requires
            a separate opt-in and confirmation. You can unsubscribe at any time
            using the link in our emails or by contacting us.
          </p>

          <h2>Service providers</h2>
          <p>
            We use trusted processors to operate the site, including Resend for
            transactional and newsletter email delivery, Formspree for the
            contact form, Vercel for hosting, and analytics providers. They
            process data only to provide their services to us.
          </p>

          <h2>Data retention</h2>
          <p>
            We keep contact and subscription records as long as needed to
            provide the services you requested, comply with law, and prevent
            abuse. Unsubscribed contacts remain suppressed so we do not
            accidentally email them again.
          </p>

          <h2>Your choices</h2>
          <ul>
            <li>Unsubscribe from newsletters via any email footer link.</li>
            <li>
              Email <ContactEmailLink /> to request access, correction, or
              deletion where applicable.
            </li>
          </ul>

          <h2>Contact</h2>
          <p>
            Questions about privacy? Email <ContactEmailLink />.
          </p>
        </Container>
      </section>
    </>
  );
}
