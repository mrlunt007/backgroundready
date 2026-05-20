import { compileMdxBody } from "@/lib/content/compile-mdx";
import {
  isVisibleInProduction,
  listMdxFiles,
  parseFrontmatter,
  readMdxFile,
} from "@/lib/content/fs";
import { serviceFrontmatterSchema } from "@/lib/content/schemas";
import type { Service, ServiceWithContent } from "@/types/service";

function loadServiceMeta(filename: string): Service | null {
  const { data } = readMdxFile("services", filename);
  const frontmatter = parseFrontmatter(data, serviceFrontmatterSchema);

  if (!isVisibleInProduction(frontmatter.draft)) return null;

  return frontmatter;
}

export function getAllServices(): Service[] {
  return listMdxFiles("services")
    .map(loadServiceMeta)
    .filter((service): service is Service => service !== null)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return getAllServices().find((service) => service.slug === slug);
}

export async function getServiceWithContent(
  slug: string,
): Promise<ServiceWithContent | undefined> {
  const filename = listMdxFiles("services").find((file) => {
    const { data } = readMdxFile("services", file);
    const parsed = parseFrontmatter(data, serviceFrontmatterSchema);
    return parsed.slug === slug;
  });

  if (!filename) return undefined;

  const { content: mdxSource } = readMdxFile("services", filename);
  const service = loadServiceMeta(filename);
  if (!service) return undefined;

  const content = await compileMdxBody(mdxSource);

  return { ...service, content };
}

export function getAllServiceSlugs(): string[] {
  return getAllServices().map((service) => service.slug);
}
