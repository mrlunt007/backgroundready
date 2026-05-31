import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

type CreateMetadataOptions = {
  title: string;
  description: string;
  path: string;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
};

export function createMetadata({
  title,
  description,
  path,
  seoTitle,
  seoDescription,
  canonicalUrl,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
}: CreateMetadataOptions): Metadata {
  const resolvedTitle = seoTitle ?? title;
  const resolvedDescription = seoDescription ?? description;
  const url = canonicalUrl ?? `${SITE_URL}${path}`;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${resolvedTitle} | ${SITE_NAME}`,
      description: resolvedDescription,
      url,
      siteName: SITE_NAME,
      type,
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime,
            authors,
            tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${resolvedTitle} | ${SITE_NAME}`,
      description: resolvedDescription,
    },
  };
}
