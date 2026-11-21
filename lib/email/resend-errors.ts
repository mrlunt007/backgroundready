type ResendErrorLike = {
  message?: string;
  name?: string;
  statusCode?: number | null;
} | null
  | undefined;

function normalize(error: ResendErrorLike): { message: string; name: string; statusCode: number | null } {
  return {
    message: (error?.message ?? "").toLowerCase(),
    name: (error?.name ?? "").toLowerCase(),
    statusCode: error?.statusCode ?? null,
  };
}

export function isContactNotFoundError(error: ResendErrorLike): boolean {
  const { message, name, statusCode } = normalize(error);
  return (
    statusCode === 404 ||
    name === "not_found" ||
    message.includes("contact not found") ||
    (message.includes("not found") && message.includes("contact"))
  );
}

export function isContactAlreadyExistsError(error: ResendErrorLike): boolean {
  const { message } = normalize(error);
  return (
    message.includes("already exists") ||
    message.includes("already been taken") ||
    message.includes("duplicate") ||
    message.includes("contact already")
  );
}

/** Map Resend/internal errors to safe user-facing copy. */
export function toUserFacingLeadError(error: string | undefined): string {
  const message = (error ?? "").toLowerCase();

  if (!message) {
    return "Something went wrong. Please try again.";
  }

  if (
    message.includes("restricted_api_key") ||
    message.includes("restricted to only send")
  ) {
    return "Email signup is misconfigured. Please try again later or email us directly.";
  }

  if (message.includes("unsubscribed")) {
    return error!;
  }

  if (message.includes("contact not found")) {
    return "We couldn't save your signup. Please try again in a moment.";
  }

  if (message.includes("quota") || message.includes("rate limit")) {
    return "We're receiving a lot of requests. Please try again shortly.";
  }

  if (message.includes("invalid") && message.includes("email")) {
    return "Enter a valid email address.";
  }

  // Keep already-sanitized friendly messages.
  if (
    message.startsWith("this email") ||
    message.startsWith("enter a valid") ||
    message.startsWith("something went wrong") ||
    message.startsWith("we couldn't") ||
    message.startsWith("we're receiving")
  ) {
    return error!;
  }

  return "Something went wrong. Please try again.";
}
