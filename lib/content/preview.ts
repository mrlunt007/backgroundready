import type { BlogPost } from "@/types/blog";
import type { Product } from "@/types/product";
import type { Service } from "@/types/service";

export type PreviewItem = {
  slug: string;
  title: string;
  description: string;
  meta?: string;
  badge?: string;
};

export function blogPostToPreviewItem(post: BlogPost): PreviewItem {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    meta: post.readingTime,
    badge: post.featured ? "Featured" : post.tags[0] ?? post.category,
  };
}

export function productToPreviewItem(product: Product): PreviewItem {
  return {
    slug: product.slug,
    title: product.title,
    description: product.shortDescription,
    meta: product.priceDisplay,
    badge: product.featured ? "Popular" : product.category,
  };
}

export function serviceToPreviewItem(service: Service): PreviewItem {
  return {
    slug: service.slug,
    title: service.title,
    description: service.summary,
    meta: service.pricing[0]?.price,
    badge: service.featured ? "Most requested" : undefined,
  };
}

export function pickFeatured<T extends { featured: boolean }>(
  items: T[],
  limit = 3,
): T[] {
  const featured = items.filter((item) => item.featured);
  const rest = items.filter((item) => !item.featured);
  return [...featured, ...rest].slice(0, limit);
}
