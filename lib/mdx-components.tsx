import { BlogInlineCTA } from "@/components/marketing/BlogInlineCTA";
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  BlogInlineCTA,
  h2: (props) => (
    <h2
      className="mt-10 scroll-mt-24 font-serif text-2xl font-semibold tracking-tight text-navy-900 first:mt-0"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 font-serif text-xl font-semibold text-navy-900"
      {...props}
    />
  ),
  p: (props) => (
    <p className="mt-4 text-base leading-relaxed text-slate-600" {...props} />
  ),
  ul: (props) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600" {...props} />
  ),
  ol: (props) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-slate-600" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  strong: (props) => (
    <strong className="font-semibold text-navy-900" {...props} />
  ),
  a: (props) => (
    <a
      className="font-medium text-[var(--brand-primary-dark)] underline decoration-[var(--brand-border)] underline-offset-2 hover:text-[var(--brand-primary)]"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-6 border-l-4 border-[var(--brand-border)] bg-[var(--brand-subtle)] py-2 pl-4 text-slate-700 italic"
      {...props}
    />
  ),
};
