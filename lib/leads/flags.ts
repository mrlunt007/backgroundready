/** Client-safe lead provider flag (Next inlines NEXT_PUBLIC_* at build time). */
export function isResendLeadsEnabled(): boolean {
  return process.env.NEXT_PUBLIC_LEAD_PROVIDER?.trim().toLowerCase() === "resend";
}
