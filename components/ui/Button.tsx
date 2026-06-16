import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.ComponentProps<typeof Link>, "href"> & {
    href: string;
    external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-[var(--brand-primary)] text-white font-bold",
    "shadow-md shadow-[var(--brand-primary)]/30",
    "hover:bg-[var(--brand-primary-hover)] hover:-translate-y-0.5",
    "hover:shadow-lg hover:shadow-[var(--brand-primary)]/40",
    "focus-visible:ring-[var(--brand-primary)]",
    "active:translate-y-0 active:shadow-md",
  ),
  secondary:
    "bg-white text-navy-900 border border-slate-200 font-semibold hover:bg-slate-50 focus-visible:ring-slate-400",
  outline:
    "border-2 border-slate-300 bg-transparent text-navy-900 font-semibold hover:border-slate-400 hover:bg-slate-50 focus-visible:ring-slate-400",
  ghost:
    "bg-transparent text-slate-700 font-medium hover:bg-slate-100 focus-visible:ring-slate-400",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-6 py-3.5 text-base rounded-2xl",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none";

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
  } = props;
  const styles = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if ("href" in props && props.href) {
    const { href, external, ...linkProps } = props;

    if (external || href.startsWith("mailto:")) {
      return (
        <a
          href={href}
          className={styles}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...linkProps}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={styles} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button type="button" className={styles} {...buttonProps}>
      {children}
    </button>
  );
}
