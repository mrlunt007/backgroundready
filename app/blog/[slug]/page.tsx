import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleJsonLd } from "@/components/blog/ArticleJsonLd";
import { BlogEmailSignup } from "@/components/blog/BlogEmailSignup";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
  getBlogPostWithContent,
  getRelatedBlogPosts,
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
    canonicalUrl: post.canonicalUrl,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.lastUpdated ?? post.date,
    authors: post.author ? [post.author.name] : undefined,
    tags: post.tags,
  });
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostWithContent(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedBlogPosts(slug);
  const publishedLabel = formatDate(post.date);
  const updatedLabel = post.lastUpdated ? formatDate(post.lastUpdated) : null;

  return (
    <>
      <ArticleJsonLd post={post} />
      <ReadingProgressBar />

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
              {post.tags[0] ? <Badge variant="brand">{post.tags[0]}</Badge> : null}
              {post.featured ? <Badge>Featured</Badge> : null}
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {post.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
              {post.author ? (
                <span>
                  By{" "}
                  <span className="font-medium text-slate-700">{post.author.name}</span>
                  {post.author.title ? `, ${post.author.title}` : ""}
                </span>
              ) : null}
              <time dateTime={post.date}>Published {publishedLabel}</time>
              {updatedLabel ? (
                <time dateTime={post.lastUpdated}>Last updated {updatedLabel}</time>
              ) : null}
              <span>{post.readingTime}</span>
            </div>
          </div>
        </Container>
      </div>

      <Section containerClassName="max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents headings={post.headings} />
            </div>
          </aside>

          <article className="min-w-0 max-w-3xl lg:max-w-none">
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
          </article>
        </div>
      </Section>

      <RelatedArticles posts={relatedPosts} />
      <BlogEmailSignup />
    </>
  );
}
