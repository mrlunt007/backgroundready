import { cn } from "@/lib/utils";

type TrustMicroCopyProps = {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
  variant?: "default" | "onDark";
};

export function TrustMicroCopy({
  children,
  className,
  align = "left",
  variant = "default",
}: TrustMicroCopyProps) {
  return (
    <p
      className={cn(
        "mt-2 text-xs leading-relaxed",
        variant === "onDark" ? "text-slate-400" : "text-slate-500",
        align === "center" && "text-center",
        className,
      )}
    >
      {children}
    </p>
  );
}
