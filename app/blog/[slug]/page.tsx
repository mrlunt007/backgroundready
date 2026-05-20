import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/marketing/CTASection";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
  getBlogPostWithContent,
} from "@/lib/content/blog";
import { createMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostWithContent(slug);
  if (!post) notFound();

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
        <Container className="py-14 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="text-sm font-medium text-brand-700 hover:text-brand-800"
            >
              ← Back to blog
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Badge variant="brand">{post.category}</Badge>
              {post.featured ? <Badge>Featured</Badge> : null}
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {post.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-500">
              <time dateTime={post.publishedAt}>{formattedDate}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
              {post.author ? (
                <>
                  <span aria-hidden>·</span>
                  <span>{post.author.name}</span>
                </>
              ) : null}
            </div>
          </div>
        </Container>
      </div>

      <Section containerClassName="max-w-3xl">
        <Prose>{post.content}</Prose>
        {post.tags.length > 0 ? (
          <div className="mt-12 flex flex-wrap gap-2 border-t border-slate-100 pt-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="muted">
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}
      </Section>

      <CTASection
        title="Put what you learned into practice"
        description="Download the free checklist and organize your work history before screening begins."
      />
    </>
  );
}
