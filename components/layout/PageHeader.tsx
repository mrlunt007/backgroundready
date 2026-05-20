import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <div className="border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
      <Container className="py-14 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
              {eyebrow}
            </p>
          ) : null}
          <h1
            className={cn(
              "text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl lg:text-5xl",
              eyebrow && "mt-3",
            )}
          >
            {title}
          </h1>
          {description ? (
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </div>
  );
}
