import Link from "next/link";
import { cn } from "@/lib/utils";

type BlogCardProps = {
  title: string;
  description: string;
  readingTime: string;
  tag?: string;
  featured?: boolean;
  href: string;
  linkLabel?: string;
};

export function BlogCard({
  title,
  description,
  readingTime,
  tag,
  featured = false,
  href,
  linkLabel = "Read article",
}: BlogCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-900/5 transition-all duration-200",
        "hover:-translate-y-1 hover:border-[var(--brand-primary)] hover:shadow-lg hover:shadow-slate-900/10",
        featured && "border-l-[3px] border-l-[var(--brand-primary)] pl-[calc(1.5rem-3px)]",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        {tag ? (
          <span className="inline-flex rounded-full bg-[var(--brand-subtle)] px-2.5 py-0.5 text-xs font-semibold text-[var(--brand-primary-dark)]">
            {tag}
          </span>
        ) : (
          <span />
        )}
        <span className="text-xs font-medium text-slate-500">{readingTime}</span>
      </div>

      <h3 className="mt-4 font-serif text-xl font-semibold leading-snug text-navy-900 transition-colors group-hover:text-[var(--brand-primary-dark)]">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {description}
      </p>

      <span className="mt-6 inline-flex items-center text-sm font-semibold text-[var(--brand-primary)] transition-colors group-hover:text-[var(--brand-primary-hover)]">
        {linkLabel}
        <span aria-hidden className="ml-1 transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
}
