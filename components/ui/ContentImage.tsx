import Image from "next/image";
import { cn } from "@/lib/utils";

type ContentImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  aspect?: "video" | "portrait" | "wide" | "square";
  sizes?: string;
};

const aspectClasses = {
  video: "aspect-video",
  portrait: "aspect-[4/5] sm:aspect-[3/4]",
  wide: "aspect-[16/10]",
  square: "aspect-square",
};

export function ContentImage({
  src,
  alt,
  priority = false,
  className,
  imageClassName,
  aspect = "wide",
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: ContentImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-lg shadow-slate-900/10",
        aspectClasses[aspect],
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}
