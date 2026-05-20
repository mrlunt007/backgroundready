import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-10 scroll-mt-24 text-2xl font-bold tracking-tight text-navy-900 first:mt-0"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-8 text-xl font-semibold text-navy-900" {...props} />
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
      className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-2 hover:text-brand-800"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-6 border-l-4 border-brand-200 bg-brand-50/50 py-2 pl-4 text-slate-700 italic"
      {...props}
    />
  ),
};
