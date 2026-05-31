import { cn } from "@/lib/utils";

type ProseProps = {
  children: React.ReactNode;
  className?: string;
};

export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cn(
        "prose prose-slate max-w-none",
        "prose-headings:font-serif prose-headings:font-semibold prose-headings:text-navy-900",
        "prose-a:text-[var(--brand-primary-dark)] prose-a:no-underline hover:prose-a:text-[var(--brand-primary)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
