import { Children, isValidElement, type ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import { BlogInlineCTA } from "@/components/marketing/BlogInlineCTA";
import { slugifyHeading } from "@/lib/content/slugify";

function getHeadingText(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child);
      }
      if (isValidElement<{ children?: ReactNode }>(child)) {
        return getHeadingText(child.props.children);
      }
      return "";
    })
    .join("")
    .trim();
}

function createHeadingComponent(level: 2 | 3) {
  const className =
    level === 2
      ? "mt-10 scroll-mt-28 font-serif text-2xl font-semibold tracking-tight text-navy-900 first:mt-0"
      : "mt-8 scroll-mt-28 font-serif text-xl font-semibold text-navy-900";
  const Tag = level === 2 ? "h2" : "h3";

  function HeadingComponent({ children, ...props }: { children?: ReactNode }) {
    const text = getHeadingText(children);
    const id = slugifyHeading(text);

    return (
      <Tag id={id} className={className} {...props}>
        {children}
      </Tag>
    );
  }

  HeadingComponent.displayName = level === 2 ? "MdxH2" : "MdxH3";
  return HeadingComponent;
}

export const mdxComponents: MDXComponents = {
  BlogInlineCTA,
  h2: createHeadingComponent(2),
  h3: createHeadingComponent(3),
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
