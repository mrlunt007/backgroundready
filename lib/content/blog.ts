import readingTime from "reading-time";
import { compileMdxBody } from "@/lib/content/compile-mdx";
import { injectBlogInlineCTA } from "@/lib/content/inject-blog-cta";
import {
  isVisibleInProduction,
  listMdxFiles,
  parseFrontmatter,
  readMdxFile,
} from "@/lib/content/fs";
import { blogPostFrontmatterSchema } from "@/lib/content/schemas";
import type { BlogPost, BlogPostWithContent } from "@/types/blog";

function loadBlogPostMeta(filename: string): BlogPost | null {
  const { data, content } = readMdxFile("blog", filename);
  const frontmatter = parseFrontmatter(data, blogPostFrontmatterSchema);

  if (!isVisibleInProduction(frontmatter.draft)) return null;

  const stats = readingTime(content);

  return {
    ...frontmatter,
    readingTime: stats.text,
  };
}

export function getAllBlogPosts(): BlogPost[] {
  return listMdxFiles("blog")
    .map(loadBlogPostMeta)
    .filter((post): post is BlogPost => post !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((post) => post.slug === slug);
}

export async function getBlogPostWithContent(
  slug: string,
): Promise<BlogPostWithContent | undefined> {
  const filename = listMdxFiles("blog").find((file) => {
    const { data } = readMdxFile("blog", file);
    const parsed = parseFrontmatter(data, blogPostFrontmatterSchema);
    return parsed.slug === slug;
  });

  if (!filename) return undefined;

  const { content: mdxSource } = readMdxFile("blog", filename);
  const post = loadBlogPostMeta(filename);
  if (!post) return undefined;

  const content = await compileMdxBody(injectBlogInlineCTA(mdxSource));

  return { ...post, content };
}

export function getAllBlogSlugs(): string[] {
  return getAllBlogPosts().map((post) => post.slug);
}
