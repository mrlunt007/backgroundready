import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

type CreateMetadataOptions = {
  title: string;
  description: string;
  path: string;
  seoTitle?: string;
  seoDescription?: string;
};

export function createMetadata({
  title,
  description,
  path,
  seoTitle,
  seoDescription,
}: CreateMetadataOptions): Metadata {
  const resolvedTitle = seoTitle ?? title;
  const resolvedDescription = seoDescription ?? description;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical: `${SITE_URL}${path}`,
    },
    openGraph: {
      title: `${resolvedTitle} | ${SITE_NAME}`,
      description: resolvedDescription,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${resolvedTitle} | ${SITE_NAME}`,
      description: resolvedDescription,
    },
  };
}
