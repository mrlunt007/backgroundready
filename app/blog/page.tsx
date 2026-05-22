import type { Metadata } from "next";
import { CTASection } from "@/components/marketing/CTASection";
import { PageHeader } from "@/components/layout/PageHeader";
import { PreviewCard } from "@/components/ui/PreviewCard";
import { Section } from "@/components/ui/Section";
import { getAllBlogPosts } from "@/lib/content/blog";
import { blogPostToPreviewItem } from "@/lib/content/preview";
import { SITE_NAME } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Blog",
  description: `Articles and guides from ${SITE_NAME} on background checks, employment gaps, references, and interview readiness.`,
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PreviewCard
                key={post.slug}
                item={blogPostToPreviewItem(post)}
                href={`/blog/${post.slug}`}
                linkLabel="Read article"
              />
            ))}
          </div>
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
