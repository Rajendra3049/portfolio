import { type ProjectScreenshot } from "@/entities/project";
import { cn } from "@/shared/lib/utils";

type ScreenshotGalleryProps = {
  screenshots: ProjectScreenshot[];
  slug: string;
};

const galleryThemes: Record<string, string> = {
  taskorbit: "from-indigo-900/40 to-violet-950/60",
  "hisab-diary": "from-emerald-900/40 to-teal-950/60",
  wingshooter: "from-amber-900/40 to-orange-950/60",
};

export const ScreenshotGallery = ({ screenshots, slug }: ScreenshotGalleryProps) => {
  const gradient = galleryThemes[slug] ?? "from-zinc-800/40 to-zinc-950/60";

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {screenshots.map((screenshot, index) => (
        <figure
          key={screenshot.src}
          className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/80"
        >
          <div
            className={cn(
              "relative flex aspect-[16/10] items-center justify-center bg-gradient-to-br",
              gradient,
            )}
            role="img"
            aria-label={screenshot.alt}
          >
            <div className="absolute inset-x-6 top-4 flex gap-1.5">
              <span className="size-2 rounded-full bg-red-400/70" />
              <span className="size-2 rounded-full bg-amber-400/70" />
              <span className="size-2 rounded-full bg-emerald-400/70" />
            </div>
            <div className="mx-6 mt-8 w-full space-y-2 rounded-lg border border-white/10 bg-black/20 p-4">
              <div className="h-2 w-1/3 rounded bg-white/20" />
              <div className="h-2 w-full rounded bg-white/10" />
              <div className="h-2 w-5/6 rounded bg-white/10" />
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="h-10 rounded bg-white/10" />
                <div className="h-10 rounded bg-white/10" />
                <div className="h-10 rounded bg-white/10" />
              </div>
            </div>
            <span className="absolute bottom-3 right-4 text-[10px] uppercase tracking-wider text-zinc-500">
              Screen {index + 1}
            </span>
          </div>
          <figcaption className="border-t border-zinc-800 px-4 py-3 text-sm text-zinc-400">
            {screenshot.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
};
