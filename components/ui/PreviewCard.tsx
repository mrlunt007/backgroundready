import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { PreviewItem } from "@/lib/placeholders";
import { cn } from "@/lib/utils";

type PreviewCardProps = {
  item: PreviewItem;
  href: string;
  linkLabel?: string;
};

export function PreviewCard({
  item,
  href,
  linkLabel = "Learn more",
}: PreviewCardProps) {
  return (
    <Card hover className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        {item.badge ? <Badge variant="brand">{item.badge}</Badge> : <span />}
        {item.meta ? (
          <span className="text-xs font-medium text-slate-500">{item.meta}</span>
        ) : null}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-navy-900">{item.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {item.description}
      </p>
      <Link
        href={href}
        className={cn(
          "mt-6 inline-flex items-center text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800",
        )}
      >
        {linkLabel}
        <span aria-hidden className="ml-1">
          →
        </span>
      </Link>
    </Card>
  );
}
