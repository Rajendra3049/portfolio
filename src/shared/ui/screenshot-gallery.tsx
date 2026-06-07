import Image from "next/image";
import { type ProjectScreenshot } from "@/entities/project";

const IMAGE_QUALITY = 95;

type ScreenshotGalleryProps = {
  screenshots: ProjectScreenshot[];
};

export const ScreenshotGallery = ({ screenshots }: ScreenshotGalleryProps) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {screenshots.map((screenshot) => (
        <figure
          key={screenshot.src}
          className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/80"
        >
          <div className="overflow-hidden bg-zinc-950">
            <Image
              src={screenshot.src}
              alt={screenshot.alt}
              width={1920}
              height={1080}
              quality={IMAGE_QUALITY}
              sizes="(max-width: 640px) 100vw, 440px"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="border-t border-zinc-800 px-4 py-3 text-sm text-zinc-400">
            {screenshot.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
};
