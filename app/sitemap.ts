import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/content/blog";
import { SITE_URL } from "@/lib/constants";

const staticRoutes = [
  "",
  "/blog",
  "/verification",
  "/approach",
  "/contact",
  "/checklist",
  "/about",
  "/products",
  "/services",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.lastUpdated ?? post.date),
    changeFrequency: "monthly",
    priority: post.featured ? 0.9 : 0.8,
  }));

  return [...staticEntries, ...blogEntries];
}
