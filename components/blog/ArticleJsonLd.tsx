import { SITE_NAME, SITE_URL } from "@/lib/constants";
import type { BlogPost } from "@/types/blog";

type ArticleJsonLdProps = {
  post: BlogPost;
};

export function ArticleJsonLd({ post }: ArticleJsonLdProps) {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.lastUpdated ?? post.date,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
          ...(post.author.title ? { jobTitle: post.author.title } : {}),
        }
      : {
          "@type": "Organization",
          name: SITE_NAME,
        },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.canonicalUrl ?? `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
    />
  );
}
