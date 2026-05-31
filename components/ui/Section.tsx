import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  variant?: "default" | "muted" | "dark" | "offWhite";
};

const variantStyles = {
  default: "bg-white",
  muted: "bg-slate-50 border-y border-slate-100",
  offWhite: "bg-surface-off-white border-y border-slate-100",
  dark: "dark-section",
};

export function Section({
  children,
  className,
  containerClassName,
  id,
  variant = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-16 sm:py-24", variantStyles[variant], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
