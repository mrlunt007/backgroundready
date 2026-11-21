type LeadLogFields = {
  stage: string;
  ok?: boolean;
  errorType?: string;
  errorName?: string;
  statusCode?: number | null;
  message?: string;
  detail?: string;
};

function sanitizeMessage(message: unknown): string | undefined {
  if (typeof message !== "string" || !message) return undefined;
  // Never log secrets or full email addresses from unexpected dumps.
  return message
    .replace(/re_[A-Za-z0-9_]+/g, "re_***")
    .replace(
      /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,
      "[redacted-email]",
    )
    .slice(0, 300);
}

export function logLeadEvent(
  flow: "checklist" | "newsletter" | "confirm" | "unsubscribe" | "contacts",
  fields: LeadLogFields,
): void {
  const payload = {
    flow,
    stage: fields.stage,
    ok: fields.ok,
    errorType: fields.errorType,
    errorName: fields.errorName,
    statusCode: fields.statusCode ?? undefined,
    message: sanitizeMessage(fields.message),
    detail: fields.detail,
  };

  if (fields.ok === false) {
    console.error("[leads]", JSON.stringify(payload));
    return;
  }

  console.info("[leads]", JSON.stringify(payload));
}

export function errorFields(error: unknown): Pick<
  LeadLogFields,
  "errorType" | "errorName" | "message" | "statusCode"
> {
  if (!error) {
    return { errorType: "unknown" };
  }

  if (typeof error === "string") {
    return { errorType: "string", message: error };
  }

  if (typeof error === "object") {
    const record = error as {
      name?: string;
      message?: string;
      statusCode?: number | null;
      constructor?: { name?: string };
    };
    return {
      errorType: record.constructor?.name ?? typeof error,
      errorName: record.name,
      message: record.message,
      statusCode: record.statusCode ?? null,
    };
  }

  return { errorType: typeof error, message: String(error) };
}
