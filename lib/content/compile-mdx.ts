import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/lib/mdx-components";

export async function compileMdxBody(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: { parseFrontmatter: false },
  });
  return content;
}
