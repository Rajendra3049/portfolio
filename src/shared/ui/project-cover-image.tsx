import Image from "next/image";
import { cn } from "@/shared/lib/utils";

const IMAGE_QUALITY = 95;

type CoverTheme = {
  gradient: string;
  accent: string;
  label: string;
  subtitle?: string;
};

const coverThemes: Record<string, CoverTheme> = {
  taskorbit: {
    gradient: "from-indigo-950 via-violet-900 to-zinc-950",
    accent: "bg-indigo-400/80",
    label: "TaskOrbit",
  },
  "hisab-diary": {
    gradient: "from-emerald-950 via-teal-900 to-zinc-950",
    accent: "bg-emerald-400/80",
    label: "Hisab Diary",
  },
  wingshooter: {
    gradient: "from-amber-950 via-orange-900 to-zinc-950",
    accent: "bg-amber-400/80",
    label: "WingShooter",
    subtitle: "Real-Time Shooting Game",
  },
  lint: {
    gradient: "from-fuchsia-950 via-rose-900 to-zinc-950",
    accent: "bg-rose-400/80",
    label: "Lint",
    subtitle: "E-commerce Platform",
  },
};

const defaultTheme: CoverTheme = {
  gradient: "from-zinc-900 via-zinc-800 to-zinc-950",
  accent: "bg-zinc-400/80",
  label: "Project",
};

type ProjectCoverImageProps = {
  slug: string;
  title: string;
  category?: string;
  coverImage?: string;
  className?: string;
  variant?: "card" | "hero";
};

export const ProjectCoverImage = ({
  slug,
  title,
  category,
  coverImage,
  className,
  variant = "card",
}: ProjectCoverImageProps) => {
  const theme = coverThemes[slug] ?? defaultTheme;
  const isHero = variant === "hero";
  const showRealImage = isHero && Boolean(coverImage);

  if (showRealImage && coverImage) {
    return (
      <div
        className={cn(
          "overflow-hidden border-b border-zinc-800/80 bg-zinc-950",
          className,
        )}
      >
        <div className="relative">
          <Image
            src={coverImage}
            alt={`${title} product preview`}
            width={1920}
            height={975}
            quality={IMAGE_QUALITY}
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="h-auto w-full"
          />
          <div className="absolute inset-x-0 top-0 flex items-center gap-2 border-b border-white/10 bg-black/40 px-4 py-2.5 backdrop-blur-sm">
            <span className="size-2.5 rounded-full bg-red-400/80" />
            <span className="size-2.5 rounded-full bg-amber-400/80" />
            <span className="size-2.5 rounded-full bg-emerald-400/80" />
            <span className="ml-2 truncate text-[10px] text-zinc-300 sm:text-xs">
              {title.toLowerCase().replace(/\s+/g, "-")}.app
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden border-b border-zinc-800/80 bg-zinc-950",
        isHero ? "aspect-[21/9] min-h-[220px] sm:min-h-[280px]" : "aspect-[16/10]",
        className,
      )}
      aria-hidden
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br", theme.gradient)} />

      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-[12%] top-[18%] h-24 w-40 rounded-lg border border-white/10 bg-white/5 sm:h-32 sm:w-56" />
        <div className="absolute right-[10%] top-[28%] h-20 w-32 rounded-lg border border-white/10 bg-white/5 sm:h-28 sm:w-48" />
        <div className="absolute bottom-[16%] left-[20%] right-[20%] h-16 rounded-lg border border-white/10 bg-white/5 sm:h-24" />
      </div>

      <div className="absolute inset-x-0 top-0 flex items-center gap-2 border-b border-white/10 bg-black/20 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-red-400/80" />
        <span className="size-2.5 rounded-full bg-amber-400/80" />
        <span className="size-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-2 truncate text-[10px] text-zinc-400 sm:text-xs">
          {title.toLowerCase().replace(/\s+/g, "-")}.app
        </span>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <span className={cn("mb-3 h-1 w-12 rounded-full", theme.accent)} />
        <p className="text-lg font-semibold tracking-tight text-white/90 sm:text-2xl">
          {theme.label}
        </p>
        {theme.subtitle ?? category ? (
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-zinc-400">
            {theme.subtitle ?? category}
          </p>
        ) : null}
      </div>
    </div>
  );
};
