"use client";

import Image from "next/image";
import { motion, useReducedMotion, type MotionValue } from "framer-motion";
import { cn } from "@/shared/lib/utils";

type ProjectChapterImageProps = {
  title: string;
  coverImage: string;
  isReversed: boolean;
  isHovered: boolean;
  parallaxX?: MotionValue<number>;
  parallaxY?: MotionValue<number>;
  className?: string;
};

export const ProjectChapterImage = ({
  title,
  coverImage,
  isReversed,
  isHovered,
  parallaxX,
  parallaxY,
  className,
}: ProjectChapterImageProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-950 shadow-[0_24px_60px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      <motion.div
        className="relative aspect-[16/10] overflow-hidden sm:aspect-[5/3]"
        initial={
          shouldReduceMotion
            ? false
            : { clipPath: isReversed ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }
        }
        whileInView={
          shouldReduceMotion
            ? undefined
            : { clipPath: "inset(0 0% 0 0)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
        }
        viewport={{ once: true, amount: 0.35 }}
      >
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={
            shouldReduceMotion || !parallaxX || !parallaxY
              ? undefined
              : {
                  x: parallaxX,
                  y: parallaxY,
                }
          }
          animate={
            shouldReduceMotion
              ? undefined
              : isHovered
                ? { scale: 1.03, y: -4 }
                : { scale: [1, 1.04, 1.02, 1.04, 1], y: 0 }
          }
          transition={
            isHovered
              ? { duration: 0.35, ease: "easeOut" }
              : { duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
          }
        >
          <Image
            src={coverImage}
            alt={`${title} product preview`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={95}
            className="object-cover object-top"
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center gap-2 border-b border-white/10 bg-black/40 px-4 py-2.5 backdrop-blur-sm">
          <span className="size-2.5 rounded-full bg-red-400/80" />
          <span className="size-2.5 rounded-full bg-amber-400/80" />
          <span className="size-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-2 truncate text-[10px] text-zinc-300 sm:text-xs">
            {title.toLowerCase().replace(/\s+/g, "-")}.app
          </span>
        </div>

        <motion.div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950/70 via-zinc-950/10 to-transparent"
          animate={isHovered ? { opacity: 0.95 } : { opacity: 0.75 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
};
