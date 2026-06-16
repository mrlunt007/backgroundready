import { cn } from "@/lib/utils";

type ContentVideoProps = {
  src: string;
  alt: string;
  poster?: string;
  className?: string;
  aspect?: "video" | "portrait" | "wide" | "square";
};

const aspectClasses = {
  video: "aspect-video",
  portrait: "aspect-[4/5] sm:aspect-[3/4]",
  wide: "aspect-[16/10]",
  square: "aspect-square",
};

export function ContentVideo({
  src,
  alt,
  poster,
  className,
  aspect = "wide",
}: ContentVideoProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-900 shadow-lg shadow-slate-900/10",
        aspectClasses[aspect],
        className,
      )}
    >
      <video
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label={alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
