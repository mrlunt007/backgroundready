import { slugifyHeading } from "@/lib/content/slugify";

export type ContentHeading = {
  level: 2 | 3;
  text: string;
  id: string;
};

export function extractHeadings(content: string): ContentHeading[] {
  const headings: ContentHeading[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/\*\*|__/g, "").trim();
    headings.push({
      level,
      text,
      id: slugifyHeading(text),
    });
  }

  return headings;
}
