"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type YouTubeEmbedProps = {
  /** 11-character YouTube video ID */
  videoId?: string;
  /** Full YouTube watch or youtu.be URL (videoId takes precedence) */
  url?: string;
  /** Start time in seconds (also parsed from url `t=` / `start=` params) */
  start?: number;
  /** Accessible title for the iframe */
  title: string;
  /** Optional caption shown below the embed */
  caption?: string;
  className?: string;
};

function parseStartParam(value: string | null): number | undefined {
  if (!value) return undefined;
  const secondsMatch = value.match(/^(\d+)s?$/);
  if (secondsMatch) return Number(secondsMatch[1]);
  const asNumber = Number(value);
  return Number.isFinite(asNumber) && asNumber >= 0 ? asNumber : undefined;
}

export function parseYouTubeInput(
  videoId?: string,
  url?: string,
  start?: number,
): { id: string; start?: number } {
  if (videoId) {
    return { id: videoId, start };
  }

  if (!url) {
    throw new Error("YouTubeEmbed requires videoId or url");
  }

  const parsed = new URL(url);
  let id: string | undefined;

  if (parsed.hostname.includes("youtu.be")) {
    id = parsed.pathname.replace("/", "") || undefined;
  } else {
    id = parsed.searchParams.get("v") ?? undefined;
    if (!id) {
      const embedMatch = parsed.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
      id = embedMatch?.[1];
    }
  }

  if (!id || !/^[a-zA-Z0-9_-]{11}$/.test(id)) {
    throw new Error(`Invalid YouTube URL or video ID: ${url}`);
  }

  const urlStart =
    parseStartParam(parsed.searchParams.get("t")) ??
    parseStartParam(parsed.searchParams.get("start"));

  return { id, start: start ?? urlStart };
}

function buildEmbedSrc(id: string, start?: number): string {
  const params = new URLSearchParams();
  if (start !== undefined && start > 0) {
    params.set("start", String(start));
  }
  const query = params.toString();
  return `https://www.youtube-nocookie.com/embed/${id}${query ? `?${query}` : ""}`;
}

function isNearViewport(element: HTMLElement, rootMarginPx = 240): boolean {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight + rootMarginPx && rect.bottom > -rootMarginPx;
}

export function YouTubeEmbed({
  videoId,
  url,
  start,
  title,
  caption,
  className,
}: YouTubeEmbedProps) {
  const { id, start: resolvedStart } = parseYouTubeInput(videoId, url, start);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const loadIfVisible = () => {
      if (isNearViewport(element)) {
        setShouldLoad(true);
        return true;
      }
      return false;
    };

    if (loadIfVisible()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(element);

    // Re-check after layout — IO can miss above-the-fold nodes on first paint.
    const raf = window.requestAnimationFrame(() => {
      if (loadIfVisible()) {
        observer.disconnect();
      }
    });

    const fallback = window.setTimeout(() => {
      setShouldLoad(true);
      observer.disconnect();
    }, 4000);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  const embedSrc = buildEmbedSrc(id, resolvedStart);

  return (
    <figure className={cn("not-prose my-8", className)}>
      <div
        ref={containerRef}
        className="relative aspect-video overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-900 shadow-lg shadow-slate-900/10"
      >
        {shouldLoad ? (
          <iframe
            src={embedSrc}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center bg-slate-100 text-sm text-slate-500"
            aria-hidden
          >
            Video will load when you scroll here
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm leading-relaxed text-slate-500 italic">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
