import { cn } from "@/lib/utils";

type ProseProps = {
  children: React.ReactNode;
  className?: string;
};

export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cn(
        "prose prose-slate max-w-none prose-headings:text-navy-900 prose-a:text-brand-700",
        className,
      )}
    >
      {children}
    </div>
  );
}
