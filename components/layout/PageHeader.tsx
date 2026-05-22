import { ContentImage } from "@/components/ui/ContentImage";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type PageHeaderImage = {
  src: string;
  alt: string;
  priority?: boolean;
  aspect?: "video" | "portrait" | "wide" | "square";
};

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  image?: PageHeaderImage;
  align?: "center" | "split";
};

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  image,
  align = "center",
}: PageHeaderProps) {
  const isSplit = align === "split" && image;

  return (
    <div className="border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
      <Container className="py-14 sm:py-20">
        <div
          className={cn(
            isSplit
              ? "grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
              : "mx-auto max-w-3xl text-center",
          )}
        >
          <div className={cn(isSplit && "text-left")}>
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
              <p
                className={cn(
                  "mt-4 text-lg leading-relaxed text-slate-600",
                  !isSplit && "mx-auto",
                )}
              >
                {description}
              </p>
            ) : null}
            {children ? (
              <div className={cn("mt-8", !isSplit && "flex justify-center")}>
                {children}
              </div>
            ) : null}
          </div>

          {isSplit ? (
            <ContentImage
              src={image.src}
              alt={image.alt}
              priority={image.priority}
              aspect={image.aspect ?? "portrait"}
              sizes="(max-width: 1024px) 100vw, 480px"
            />
          ) : null}
        </div>
      </Container>
    </div>
  );
}
