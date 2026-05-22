import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Section } from "@/components/ui/Section";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${SITE_NAME} team.`,
};

const contactReasons = [
  "Questions about products or services",
  "Partnership or media inquiries",
  "Feedback on articles and guides",
  "Help with your checklist download",
];

export default function ContactPage() {
  return (
    <>
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
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-navy-900">Get in touch</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Prefer email? We respond to most messages within two business days.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-block text-base font-semibold text-brand-700 hover:text-brand-800"
            >
              {CONTACT_EMAIL}
            </a>

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
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button disabled>Send message (soon)</Button>
                <Button
                  href={`mailto:${CONTACT_EMAIL}`}
                  variant="outline"
                >
                  Email us directly
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </Section>
    </>
  );
}
