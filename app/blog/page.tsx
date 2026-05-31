import type { Metadata } from "next";
import { CTASection } from "@/components/marketing/CTASection";
import { BlogIndexClient } from "@/components/blog/BlogIndexClient";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import {
  getAllBlogPosts,
  getAllBlogTags,
  toBlogPostSummary,
} from "@/lib/content/blog";
import { SITE_NAME } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description: `Articles and guides from ${SITE_NAME} on background checks, employment gaps, references, and interview readiness.`,
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getAllBlogPosts().map(toBlogPostSummary);
  const tags = getAllBlogTags();

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Guides for every stage of your search"
        description="Practical articles on what employers verify, how to explain your history, and how to stay confident through screening."
        align="split"
        image={{
          src: IMAGES.officeAtrium.src,
          alt: IMAGES.officeAtrium.alt,
          aspect: "wide",
        }}
      />

      <Section>
        {posts.length > 0 ? (
          <BlogIndexClient posts={posts} tags={tags} />
        ) : (
          <p className="text-center text-slate-600">No articles published yet.</p>
        )}
      </Section>

      <CTASection
        title="Prepare while you read"
        description="Download the free checklist and start organizing your work history today."
      />
    </>
  );
}
