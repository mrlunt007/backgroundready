import readingTime from "reading-time";
import { compileMdxBody } from "@/lib/content/compile-mdx";
import { extractHeadings } from "@/lib/content/extract-headings";
import { injectBlogInlineCTA } from "@/lib/content/inject-blog-cta";
import {
  isVisibleInProduction,
  listMdxFiles,
  parseFrontmatter,
  readMdxFile,
} from "@/lib/content/fs";
import { blogPostFrontmatterSchema } from "@/lib/content/schemas";
import type { BlogPost, BlogPostWithContent } from "@/types/blog";

function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx?$/, "");
}

function loadBlogPostMeta(filename: string): BlogPost | null {
  const { data, content } = readMdxFile("blog", filename);
  const parsed = parseFrontmatter(data, blogPostFrontmatterSchema);

  if (!isVisibleInProduction(parsed.draft)) return null;

  const slug = parsed.slug ?? slugFromFilename(filename);
  const stats = readingTime(content);

  return {
    title: parsed.title,
    slug,
    description: parsed.description,
    date: parsed.date,
    lastUpdated: parsed.lastUpdated,
    author: parsed.author,
    category: parsed.category,
    tags: parsed.tags,
    featured: parsed.featured,
    draft: parsed.draft,
    seoTitle: parsed.seoTitle,
    seoDescription: parsed.seoDescription,
    canonicalUrl: parsed.canonicalUrl,
    readingTime: parsed.readTime ?? stats.text,
  };
}

export function getAllBlogPosts(): BlogPost[] {
  return listMdxFiles("blog")
    .map(loadBlogPostMeta)
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((post) => post.slug === slug);
}

export function getAllBlogTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllBlogPosts()) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}

export function getRelatedBlogPosts(slug: string, limit = 3): BlogPost[] {
  const current = getBlogPostBySlug(slug);
  if (!current) return [];

  const others = getAllBlogPosts().filter((post) => post.slug !== slug);
  const scored = others
    .map((post) => ({
      post,
      score: post.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    });

  const related = scored.filter((item) => item.score > 0).map((item) => item.post);
  if (related.length >= limit) {
    return related.slice(0, limit);
  }

  const filler = others.filter((post) => !related.some((item) => item.slug === post.slug));
  return [...related, ...filler].slice(0, limit);
}

export async function getBlogPostWithContent(
  slug: string,
): Promise<BlogPostWithContent | undefined> {
  const filename = listMdxFiles("blog").find((file) => {
    const slugFromFile = slugFromFilename(file);
    const { data } = readMdxFile("blog", file);
    const parsed = parseFrontmatter(data, blogPostFrontmatterSchema);
    return (parsed.slug ?? slugFromFile) === slug;
  });

  if (!filename) return undefined;

  const { content: mdxSource } = readMdxFile("blog", filename);
  const post = loadBlogPostMeta(filename);
  if (!post) return undefined;

  const headings = extractHeadings(mdxSource);
  const content = await compileMdxBody(injectBlogInlineCTA(mdxSource));

  return { ...post, content, headings };
}

export function getAllBlogSlugs(): string[] {
  return getAllBlogPosts().map((post) => post.slug);
}

export type BlogPostSummary = Pick<
  BlogPost,
  "slug" | "title" | "description" | "readingTime" | "tags" | "featured" | "date"
>;

export function toBlogPostSummary(post: BlogPost): BlogPostSummary {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    readingTime: post.readingTime,
    tags: post.tags,
    featured: post.featured,
    date: post.date,
  };
}
