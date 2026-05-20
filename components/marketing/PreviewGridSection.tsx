import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PreviewCard } from "@/components/ui/PreviewCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PreviewItem } from "@/lib/placeholders";

type PreviewGridSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  items: PreviewItem[];
  basePath: "/blog" | "/products" | "/services";
  viewAllHref: string;
  viewAllLabel: string;
  linkLabel?: string;
  variant?: "default" | "muted";
  /** When false, cards link to the index page until [slug] routes exist */
  detailPagesEnabled?: boolean;
};

export function PreviewGridSection({
  id,
  eyebrow,
  title,
  description,
  items,
  basePath,
  viewAllHref,
  viewAllLabel,
  linkLabel = "Learn more",
  variant = "default",
  detailPagesEnabled = false,
}: PreviewGridSectionProps) {
  return (
    <Section id={id} variant={variant}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <Button href={viewAllHref} variant="outline" className="shrink-0 self-start sm:self-auto">
          {viewAllLabel}
        </Button>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <PreviewCard
            key={item.slug}
            item={item}
            href={
              detailPagesEnabled
                ? `${basePath}/${item.slug}`
                : viewAllHref
            }
            linkLabel={detailPagesEnabled ? linkLabel : "Preview"}
          />
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-slate-500">
        Detailed pages coming soon.{" "}
        <Link href={viewAllHref} className="font-medium text-brand-700 hover:text-brand-800">
          Browse all {viewAllLabel.toLowerCase().replace("view all ", "")}
        </Link>
      </p>
    </Section>
  );
}
