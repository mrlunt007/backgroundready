import type { z } from "zod";
import type { serviceFrontmatterSchema } from "@/lib/content/schemas";

export type ServiceFrontmatter = z.infer<typeof serviceFrontmatterSchema>;

export type Service = ServiceFrontmatter;

export type ServiceWithContent = Service & {
  content: React.ReactNode;
};
