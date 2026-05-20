import type { z } from "zod";
import type { blogPostFrontmatterSchema } from "@/lib/content/schemas";

export type BlogPostFrontmatter = z.infer<typeof blogPostFrontmatterSchema>;

export type BlogPost = BlogPostFrontmatter & {
  readingTime: string;
};

export type BlogPostWithContent = BlogPost & {
  content: React.ReactNode;
};
