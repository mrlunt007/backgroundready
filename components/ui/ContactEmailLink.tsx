import { CONTACT_EMAIL, CONTACT_MAILTO_HREF } from "@/lib/constants";
import { cn } from "@/lib/utils";

type ContactEmailLinkProps = {
  className?: string;
  showLabel?: boolean;
  /** Pre-fill the mail client subject line (uses default contact subject when true). */
  withSubject?: boolean;
  /** Large button-style link for primary CTAs (e.g. contact page). */
  prominent?: boolean;
};

export function ContactEmailLink({
  className,
  showLabel = true,
  withSubject = false,
  prominent = false,
}: ContactEmailLinkProps) {
  const href = withSubject ? CONTACT_MAILTO_HREF : `mailto:${CONTACT_EMAIL}`;

  return (
    <a
      href={href}
      className={cn(
        prominent
          ? cn(
              "inline-flex items-center justify-center rounded-lg bg-[var(--brand-primary)] px-6 py-3.5",
              "text-lg font-bold text-white no-underline shadow-md shadow-[var(--brand-primary)]/30",
              "transition-all hover:bg-[var(--brand-primary-hover)] hover:-translate-y-0.5",
              "hover:shadow-lg hover:shadow-[var(--brand-primary)]/40",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
              "focus-visible:outline-[var(--brand-primary)]",
            )
          : cn(
              "font-semibold text-brand-700 underline decoration-brand-200 underline-offset-2",
              "transition-colors hover:text-brand-800",
            ),
        className,
      )}
    >
      {showLabel ? CONTACT_EMAIL : "Email us"}
    </a>
  );
}
