import { CONTACT_EMAIL } from "@/lib/constants";
import { cn } from "@/lib/utils";

type ContactEmailLinkProps = {
  className?: string;
  showLabel?: boolean;
};

export function ContactEmailLink({
  className,
  showLabel = true,
}: ContactEmailLinkProps) {
  return (
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      className={cn(
        "font-semibold text-brand-700 underline decoration-brand-200 underline-offset-2 transition-colors hover:text-brand-800",
        className,
      )}
    >
      {showLabel ? CONTACT_EMAIL : "Email us"}
    </a>
  );
}
