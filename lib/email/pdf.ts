import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  CHECKLIST_PDF_FILENAME,
  CHECKLIST_PDF_HREF,
} from "@/lib/constants";
import { getPublicSiteUrl } from "@/lib/email/env";
import { errorFields, logLeadEvent } from "@/lib/email/logging";

export type ChecklistPdfAttachment =
  | {
      filename: string;
      path: string;
      source: "public_url";
    }
  | {
      filename: string;
      content: Buffer;
      source: "filesystem" | "fetched_url";
    };

export function getChecklistPdfPublicUrl(): string {
  return `${getPublicSiteUrl()}${CHECKLIST_PDF_HREF}`;
}

async function loadFromFilesystem(): Promise<Buffer | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "downloads",
      "background-ready-free-checklist.pdf",
    );
    return await readFile(filePath);
  } catch (error) {
    logLeadEvent("checklist", {
      stage: "pdf_filesystem",
      ok: false,
      ...errorFields(error),
      detail: "public/downloads PDF not readable in this runtime",
    });
    return null;
  }
}

async function loadFromPublicUrl(): Promise<Buffer | null> {
  const url = getChecklistPdfPublicUrl();
  try {
    const response = await fetch(url, {
      headers: { Accept: "application/pdf" },
      cache: "no-store",
    });
    if (!response.ok) {
      logLeadEvent("checklist", {
        stage: "pdf_fetch",
        ok: false,
        errorType: "http",
        statusCode: response.status,
        message: `Failed to fetch checklist PDF (${response.status})`,
      });
      return null;
    }
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length < 1_000) {
      logLeadEvent("checklist", {
        stage: "pdf_fetch",
        ok: false,
        errorType: "validation",
        message: "Fetched checklist PDF was unexpectedly small",
      });
      return null;
    }
    return bytes;
  } catch (error) {
    logLeadEvent("checklist", {
      stage: "pdf_fetch",
      ok: false,
      ...errorFields(error),
    });
    return null;
  }
}

/**
 * Prefer Resend's remote `path` attachment (Resend fetches the public PDF).
 * Fall back to filesystem / HTTP fetch content for local/dev or offline CDN issues.
 */
export async function loadChecklistPdfAttachment(): Promise<ChecklistPdfAttachment | null> {
  const publicUrl = getChecklistPdfPublicUrl();

  // Hosted URL is the most reliable attachment source on Vercel serverless
  // (the `public/` directory is often not present inside the function FS).
  if (/^https?:\/\//i.test(publicUrl)) {
    logLeadEvent("checklist", {
      stage: "pdf_attachment",
      ok: true,
      detail: "using_public_url_path",
    });
    return {
      filename: CHECKLIST_PDF_FILENAME,
      path: publicUrl,
      source: "public_url",
    };
  }

  const fromFs = await loadFromFilesystem();
  if (fromFs) {
    logLeadEvent("checklist", {
      stage: "pdf_attachment",
      ok: true,
      detail: `filesystem_bytes=${fromFs.length}`,
    });
    return {
      filename: CHECKLIST_PDF_FILENAME,
      content: fromFs,
      source: "filesystem",
    };
  }

  const fromUrl = await loadFromPublicUrl();
  if (fromUrl) {
    logLeadEvent("checklist", {
      stage: "pdf_attachment",
      ok: true,
      detail: `fetched_bytes=${fromUrl.length}`,
    });
    return {
      filename: CHECKLIST_PDF_FILENAME,
      content: fromUrl,
      source: "fetched_url",
    };
  }

  logLeadEvent("checklist", {
    stage: "pdf_attachment",
    ok: false,
    errorType: "missing_pdf",
    message: "Checklist PDF could not be loaded from filesystem or public URL",
  });
  return null;
}
