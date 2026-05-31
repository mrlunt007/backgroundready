"use client";

import { useEffect, useState } from "react";
import type { ContentHeading } from "@/lib/content/extract-headings";
import { cn } from "@/lib/utils";

type TableOfContentsProps = {
  headings: ContentHeading[];
};

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        On this page
      </p>
      <ul className="mt-4 space-y-2 border-l border-slate-200">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn(heading.level === 3 && "pl-4")}
          >
            <a
              href={`#${heading.id}`}
              className={cn(
                "block border-l-2 py-1 pl-3 text-sm leading-snug transition-colors",
                activeId === heading.id
                  ? "border-[var(--brand-primary)] font-medium text-[var(--brand-primary-dark)]"
                  : "border-transparent text-slate-600 hover:text-navy-900",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
