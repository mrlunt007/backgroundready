import { BlogCard } from "@/components/marketing/BlogCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";
import type { BlogPost } from "@/types/blog";

type RelatedArticlesProps = {
  posts: BlogPost[];
};

export function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <Section variant="muted">
      <SectionHeading
        eyebrow="Keep reading"
        title="Related articles"
        description="More guides that cover similar ground."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard
            key={post.slug}
            title={post.title}
            description={post.description}
            readingTime={post.readingTime}
            tag={post.tags[0] ?? post.category}
            featured={post.featured}
            href={`/blog/${post.slug}`}
          />
        ))}
      </div>
    </Section>
  );
}
