import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${SITE_NAME} team.`,
};

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-2xl">
        <SectionHeading
          title="Contact us"
          description="Questions about the site, products, or services? We'd like to hear from you."
        />

        <Card className="mt-10">
          <p className="text-sm text-slate-600">
            A contact form will be added in a later phase. For now, reach us by
            email and we&apos;ll respond as soon as we can.
          </p>
          <p className="mt-4">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-brand-600 hover:text-brand-700"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
          <Button
            href={`mailto:${CONTACT_EMAIL}`}
            variant="primary"
            className="mt-6"
          >
            Send an email
          </Button>
        </Card>
      </Container>
    </section>
  );
}
