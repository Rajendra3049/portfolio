"use client";

import { motion, useMotionTemplate, useReducedMotion } from "framer-motion";
import { useCursorSpotlight } from "@/shared/hooks/use-cursor-spotlight";
import { cn } from "@/shared/lib/utils";

const NOISE_TEXTURE =
  "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')";

type AmbientScenePreset = "hero" | "work" | "experience" | "capabilities";

type AmbientSceneProps = {
  preset?: AmbientScenePreset;
  className?: string;
};

const RING_COUNT = 7;
const RING_BASE_SIZE = 140;

const HeroConcentricRings = () => (
  <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
    {Array.from({ length: RING_COUNT }, (_, index) => {
      const size = (index + 1) * RING_BASE_SIZE;

      return (
        <motion.div
          key={size}
          className="absolute left-1/2 top-1/2 rounded-full border border-zinc-700/25"
          style={{
            width: size,
            height: size,
            marginLeft: -size / 2,
            marginTop: -size / 2,
          }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 0.35 - index * 0.03, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: index * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      );
    })}
    <motion.div
      className="absolute left-1/2 top-1/2 size-[min(72vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl"
      animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.06, 1] }}
      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
    />
  </div>
);

const presetConfig: Record<
  AmbientScenePreset,
  {
    gradient: string;
    overlay: string;
    spotlightSize: number;
    spotlightOpacity: number;
    grid: boolean;
    rings: boolean;
    noise: boolean;
  }
> = {
  hero: {
    gradient:
      "bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.14)_0%,rgba(9,9,11,0.4)_45%,rgba(9,9,11,0.95)_72%)]",
    overlay: "bg-[radial-gradient(circle_at_center,transparent_30%,rgba(9,9,11,0.85)_100%)]",
    spotlightSize: 640,
    spotlightOpacity: 0.09,
    grid: false,
    rings: true,
    noise: true,
  },
  work: {
    gradient: "bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_55%)]",
    overlay:
      "bg-[linear-gradient(to_bottom,rgba(9,9,11,0.1),rgba(9,9,11,0.75)_55%,rgba(9,9,11,0.95))]",
    spotlightSize: 600,
    spotlightOpacity: 0.08,
    grid: false,
    rings: false,
    noise: true,
  },
  experience: {
    gradient: "bg-[radial-gradient(ellipse_at_15%_0%,rgba(16,185,129,0.07),transparent_52%)]",
    overlay:
      "bg-[linear-gradient(to_bottom,rgba(9,9,11,0.05),rgba(9,9,11,0.55)_60%,rgba(9,9,11,0.9))]",
    spotlightSize: 520,
    spotlightOpacity: 0.07,
    grid: false,
    rings: false,
    noise: false,
  },
  capabilities: {
    gradient: "bg-[radial-gradient(ellipse_at_85%_0%,rgba(16,185,129,0.06),transparent_50%)]",
    overlay:
      "bg-[linear-gradient(to_bottom,rgba(9,9,11,0.05),rgba(9,9,11,0.5)_55%,rgba(9,9,11,0.88))]",
    spotlightSize: 500,
    spotlightOpacity: 0.065,
    grid: false,
    rings: false,
    noise: true,
  },
};


const CapabilitiesOrbs = () => (
  <>
    <motion.div
      className="absolute -right-16 top-20 h-64 w-64 rounded-full bg-emerald-500/8 blur-3xl"
      animate={{
        x: [0, -12, 8, -10, 0],
        y: [0, 8, 4, -6, 0],
        scale: [1, 1.05, 1.02, 1.06, 1],
      }}
      transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute -left-24 bottom-16 h-56 w-56 rounded-full bg-emerald-400/6 blur-3xl"
      animate={{
        x: [0, 14, -6, 10, 0],
        y: [0, -6, 8, 2, 0],
        scale: [1, 1.04, 1.01, 1.05, 1],
      }}
      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
    />
  </>
);

const WorkOrbs = () => (
  <>
    <motion.div
      className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-emerald-500/12 blur-3xl"
      animate={{
        x: [0, 18, -8, 12, 0],
        y: [0, 12, 8, -6, 0],
        scale: [1, 1.08, 1.03, 1.1, 1],
      }}
      transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute right-[-100px] bottom-10 h-80 w-80 rounded-full bg-emerald-400/8 blur-3xl"
      animate={{
        x: [0, -16, 6, -20, 0],
        y: [0, -10, 8, 4, 0],
        scale: [1, 1.06, 1.02, 1.08, 1],
      }}
      transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.8 }}
    />
  </>
);

const ExperienceOrbs = () => (
  <>
    <motion.div
      className="absolute -left-20 top-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"
      animate={{
        x: [0, 14, -6, 10, 0],
        y: [0, 10, 6, -4, 0],
        scale: [1, 1.06, 1.02, 1.08, 1],
      }}
      transition={{ duration: 17, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute right-[-80px] top-1/3 h-72 w-72 rounded-full bg-emerald-400/6 blur-3xl"
      animate={{
        x: [0, -12, 8, -16, 0],
        y: [0, -8, 6, 2, 0],
        scale: [1, 1.05, 1.01, 1.07, 1],
      }}
      transition={{ duration: 19, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.6 }}
    />
  </>
);

export const AmbientScene = ({ preset = "work", className }: AmbientSceneProps) => {
  const shouldReduceMotion = useReducedMotion();
  const { containerRef, spotlightX, spotlightY, disabled } = useCursorSpotlight();
  const config = presetConfig[preset];
  const spotlight = useMotionTemplate`radial-gradient(${config.spotlightSize}px circle at ${spotlightX}% ${spotlightY}%, rgba(16,185,129,${config.spotlightOpacity}), transparent 68%)`;

  if (shouldReduceMotion) {
    return (
      <div
        className={cn("pointer-events-none absolute inset-0 overflow-hidden", config.gradient, className)}
        aria-hidden
      >
        <div className={cn("absolute inset-0", config.overlay)} />
        {config.rings ? (
          <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
            {Array.from({ length: RING_COUNT }, (_, index) => {
              const size = (index + 1) * RING_BASE_SIZE;
              return (
                <div
                  key={size}
                  className="absolute left-1/2 top-1/2 rounded-full border border-zinc-700/25"
                  style={{
                    width: size,
                    height: size,
                    marginLeft: -size / 2,
                    marginTop: -size / 2,
                    opacity: 0.35 - index * 0.03,
                  }}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <div className={cn("absolute inset-0", config.gradient)} />
      <div className={cn("absolute inset-0", config.overlay)} />

      {preset === "hero" ? <HeroConcentricRings /> : null}
      {preset === "work" ? <WorkOrbs /> : null}
      {preset === "experience" ? <ExperienceOrbs /> : null}
      {preset === "capabilities" ? <CapabilitiesOrbs /> : null}

      {!disabled ? (
        <motion.div className="absolute inset-0" style={{ background: spotlight }} />
      ) : null}

      {config.noise ? (
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: NOISE_TEXTURE }}
        />
      ) : null}
    </div>
  );
};
