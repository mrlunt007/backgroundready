import type { z } from "zod";
import type { productFrontmatterSchema } from "@/lib/content/schemas";

export type ProductFrontmatter = z.infer<typeof productFrontmatterSchema>;

export type Product = ProductFrontmatter;

export type ProductWithContent = Product & {
  content: React.ReactNode;
};
