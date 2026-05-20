import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description: `Consulting and review services from ${SITE_NAME}.`,
};

export default function ServicesIndexPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Services"
          description="Offers and consulting packages will be listed here. Content system coming in a later phase."
        />

        <Card className="mt-10 max-w-2xl">
          <p className="text-sm text-slate-600">
            Placeholder index—no services listed yet. Future offers will live at{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">
              /services/[slug]
            </code>
            .
          </p>
          <p className="mt-4 text-sm text-slate-600">
            <Link
              href="/contact"
              className="font-medium text-brand-600 hover:text-brand-700"
            >
              Contact us
            </Link>{" "}
            in the meantime, or{" "}
            <Link href="/" className="font-medium text-brand-600 hover:text-brand-700">
              return home
            </Link>
            .
          </p>
        </Card>
      </Container>
    </section>
  );
}
