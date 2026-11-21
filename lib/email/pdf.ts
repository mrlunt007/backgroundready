import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  CHECKLIST_PDF_FILENAME,
  CHECKLIST_PDF_HREF,
} from "@/lib/constants";
import { getPublicSiteUrl } from "@/lib/email/env";

export function getChecklistPdfPublicUrl(): string {
  return `${getPublicSiteUrl()}${CHECKLIST_PDF_HREF}`;
}

export async function loadChecklistPdfAttachment(): Promise<{
  filename: string;
  content: Buffer;
} | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "downloads",
      "background-ready-free-checklist.pdf",
    );
    const content = await readFile(filePath);
    return {
      filename: CHECKLIST_PDF_FILENAME,
      content,
    };
  } catch {
    return null;
  }
}
