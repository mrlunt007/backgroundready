import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog",
  description: `Articles and guides from ${SITE_NAME} on background checks and hiring readiness.`,
};

export default function BlogIndexPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Blog"
          description="Articles are coming soon. The MDX-based blog system will be added in a later phase."
        />

        <Card className="mt-10 max-w-2xl">
          <p className="text-sm text-slate-600">
            Placeholder index—no posts yet. Future articles will live at{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">
              /blog/[slug]
            </code>
            .
          </p>
          <p className="mt-4 text-sm text-slate-600">
            <Link href="/" className="font-medium text-brand-600 hover:text-brand-700">
              ← Back to home
            </Link>
          </p>
        </Card>
      </Container>
    </section>
  );
}
