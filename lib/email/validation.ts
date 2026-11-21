import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .email("Enter a valid email address")
  .max(320);

export const checklistLeadSchema = z.object({
  email: emailSchema,
  newsletterOptIn: z.boolean().optional().default(false),
  source: z
    .enum(["checklist_page", "popup", "blog", "other"])
    .optional()
    .default("checklist_page"),
  /** Honeypot — bots fill this; humans leave it empty */
  company: z.string().max(200).optional().default(""),
});

export const newsletterLeadSchema = z.object({
  email: emailSchema,
  source: z.enum(["footer", "other"]).optional().default("footer"),
  company: z.string().max(200).optional().default(""),
});

export type ChecklistLeadInput = z.infer<typeof checklistLeadSchema>;
export type NewsletterLeadInput = z.infer<typeof newsletterLeadSchema>;
