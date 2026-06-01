"use client";

import { useMemo, useState } from "react";
import { BlogCard } from "@/components/marketing/BlogCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { BlogPostSummary } from "@/lib/content/blog";
import { cn } from "@/lib/utils";

const POSTS_PER_PAGE = 9;

type BlogIndexClientProps = {
  posts: BlogPostSummary[];
  tags: string[];
};

export function BlogIndexClient({ posts, tags }: BlogIndexClientProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const visiblePosts = useMemo(() => {
    if (!activeTag) return posts;
    return posts.filter((post) => post.tags.some((tag) => tag === activeTag));
  }, [activeTag, posts]);

  const totalPages = Math.max(1, Math.ceil(visiblePosts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginatedPosts = visiblePosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  function handleTagChange(tag: string | null) {
    setActiveTag(tag);
    setPage(1);
  }

  return (
    <div className="space-y-12">
      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleTagChange(null)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
              activeTag === null
                ? "bg-[var(--brand-primary)] text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200",
            )}
          >
            All topics
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagChange(tag)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                activeTag === tag
                  ? "bg-[var(--brand-primary)] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200",
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      ) : null}

      <section>
        {!activeTag ? (
          <SectionHeading
            eyebrow="Start here"
            title="Essential reads"
            description="Featured guides for background checks, gaps, and verification prep."
          />
        ) : (
          <SectionHeading
            eyebrow="Filtered"
            title={`Articles tagged “${activeTag}”`}
            description={`${visiblePosts.length} article${visiblePosts.length === 1 ? "" : "s"} found.`}
          />
        )}

        {paginatedPosts.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedPosts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                description={post.description}
                readingTime={post.readingTime}
                tag={post.tags[0]}
                featured={post.featured}
                href={`/blog/${post.slug}`}
              />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-center text-slate-600">
            No articles match this tag yet.
          </p>
        )}

        {visiblePosts.length > POSTS_PER_PAGE ? (
          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setPage((value) => value - 1)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors enabled:hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-slate-500">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setPage((value) => value + 1)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors enabled:hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        ) : null}
      </section>
    </div>
  );
}
