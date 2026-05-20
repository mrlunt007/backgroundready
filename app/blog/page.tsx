import type { Metadata } from "next";
import { CTASection } from "@/components/marketing/CTASection";
import { PageHeader } from "@/components/layout/PageHeader";
import { PreviewCard } from "@/components/ui/PreviewCard";
import { Section } from "@/components/ui/Section";
import { SITE_NAME } from "@/lib/constants";
import { PLACEHOLDER_ARTICLES } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "Blog",
  description: `Articles and guides from ${SITE_NAME} on background checks, employment gaps, references, and interview readiness.`,
};

export default function BlogIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Guides for every stage of your search"
        description="Practical articles on what employers verify, how to explain your history, and how to stay confident through screening."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PLACEHOLDER_ARTICLES.map((article) => (
            <PreviewCard
              key={article.slug}
              item={article}
              href="/blog"
              linkLabel="Coming soon"
            />
          ))}
        </div>
        <p className="mt-12 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-8 text-center text-sm text-slate-600">
          Full MDX blog system launching in a later phase. Articles will be available at{" "}
          <code className="rounded bg-white px-1.5 py-0.5 text-xs text-slate-700">
            /blog/[slug]
          </code>
          .
        </p>
      </Section>

      <CTASection
        title="Prepare while you read"
        description="Download the free checklist and start organizing your work history today."
      />
    </>
  );
}
