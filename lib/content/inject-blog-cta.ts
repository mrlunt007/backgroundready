/** Inject inline checklist CTA after N paragraphs in blog MDX source */

export function injectBlogInlineCTA(
  source: string,
  afterParagraph = 3,
): string {
  if (source.includes("<BlogInlineCTA")) {
    return source;
  }

  const blocks = source.split(/\n\n+/).filter((block) => block.trim().length > 0);

  if (blocks.length <= afterParagraph) {
    return source;
  }

  return [
    ...blocks.slice(0, afterParagraph),
    "<BlogInlineCTA />",
    ...blocks.slice(afterParagraph),
  ].join("\n\n");
}
