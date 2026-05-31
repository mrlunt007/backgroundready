import type { ContentHeading } from "@/lib/content/extract-headings";

export type BlogAuthor = {
  name: string;
  title?: string;
};

export type BlogPost = {
  title: string;
  slug: string;
  description: string;
  date: string;
  lastUpdated?: string;
  author?: BlogAuthor;
  category: string;
  tags: string[];
  featured: boolean;
  draft: boolean;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  readingTime: string;
};

export type BlogPostWithContent = BlogPost & {
  content: React.ReactNode;
  headings: ContentHeading[];
};
