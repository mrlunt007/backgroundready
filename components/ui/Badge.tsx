import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "brand" | "muted";
  className?: string;
};

const variants = {
  default: "bg-slate-100 text-slate-700",
  brand: "bg-brand-100 text-brand-800",
  muted: "bg-navy-100 text-navy-800",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
