import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-900/5",
        hover &&
          "transition-all duration-200 hover:border-slate-300 hover:shadow-md hover:shadow-slate-900/10",
        className,
      )}
    >
      {children}
    </div>
  );
}
