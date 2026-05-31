import { cn } from "@/lib/utils";
import { TrustMicroCopy } from "./TrustMicroCopy";

type CTAWithTrustProps = {
  children: React.ReactNode;
  trust: string;
  className?: string;
  trustAlign?: "left" | "center";
  trustVariant?: "default" | "onDark";
};

export function CTAWithTrust({
  children,
  trust,
  className,
  trustAlign = "left",
  trustVariant = "default",
}: CTAWithTrustProps) {
  return (
    <div className={cn(className)}>
      {children}
      <TrustMicroCopy align={trustAlign} variant={trustVariant}>
        {trust}
      </TrustMicroCopy>
    </div>
  );
}
