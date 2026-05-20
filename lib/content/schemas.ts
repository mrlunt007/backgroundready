import { z } from "zod";

const authorSchema = z.object({
  name: z.string(),
  title: z.string().optional(),
});

const processStepSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const pricingTierSchema = z.object({
  name: z.string(),
  price: z.string(),
  description: z.string(),
  features: z.array(z.string()).default([]),
});

export const blogPostFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  author: authorSchema.optional(),
  category: z.string().default("General"),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const productFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  shortDescription: z.string(),
  description: z.string(),
  priceDisplay: z.string(),
  gumroadUrl: z.string().url(),
  features: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  sortOrder: z.number().default(0),
  category: z.string().default("Guides"),
  draft: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const serviceFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  summary: z.string(),
  description: z.string(),
  ctaLabel: z.string().default("Get started"),
  ctaUrl: z.string().default("/contact"),
  deliverables: z.array(z.string()).default([]),
  idealFor: z.array(z.string()).default([]),
  pricing: z.array(pricingTierSchema).default([]),
  processSteps: z.array(processStepSchema).default([]),
  featured: z.boolean().default(false),
  sortOrder: z.number().default(0),
  draft: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});
