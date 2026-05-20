import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { z } from "zod";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export function getContentDir(...segments: string[]): string {
  return path.join(CONTENT_ROOT, ...segments);
}

export function listMdxFiles(...segments: string[]): string[] {
  const dir = getContentDir(...segments);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .sort();
}

export function readMdxFile(...segments: string[]): {
  raw: string;
  data: Record<string, unknown>;
  content: string;
} {
  const filePath = path.join(getContentDir(...segments));
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { raw, data, content };
}

export function parseFrontmatter<T extends z.ZodType>(
  data: Record<string, unknown>,
  schema: T,
): z.infer<T> {
  return schema.parse(data);
}

export function isVisibleInProduction(draft: boolean): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  return !draft;
}
