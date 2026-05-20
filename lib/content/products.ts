import { compileMdxBody } from "@/lib/content/compile-mdx";
import {
  isVisibleInProduction,
  listMdxFiles,
  parseFrontmatter,
  readMdxFile,
} from "@/lib/content/fs";
import { productFrontmatterSchema } from "@/lib/content/schemas";
import type { Product, ProductWithContent } from "@/types/product";

function loadProductMeta(filename: string): Product | null {
  const { data } = readMdxFile("products", filename);
  const frontmatter = parseFrontmatter(data, productFrontmatterSchema);

  if (!isVisibleInProduction(frontmatter.draft)) return null;

  return frontmatter;
}

export function getAllProducts(): Product[] {
  return listMdxFiles("products")
    .map(loadProductMeta)
    .filter((product): product is Product => product !== null)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((product) => product.slug === slug);
}

export async function getProductWithContent(
  slug: string,
): Promise<ProductWithContent | undefined> {
  const filename = listMdxFiles("products").find((file) => {
    const { data } = readMdxFile("products", file);
    const parsed = parseFrontmatter(data, productFrontmatterSchema);
    return parsed.slug === slug;
  });

  if (!filename) return undefined;

  const { content: mdxSource } = readMdxFile("products", filename);
  const product = loadProductMeta(filename);
  if (!product) return undefined;

  const content = await compileMdxBody(mdxSource);

  return { ...product, content };
}

export function getAllProductSlugs(): string[] {
  return getAllProducts().map((product) => product.slug);
}
