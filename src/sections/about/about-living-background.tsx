"use client";

import { memo } from "react";
import { motion, useMotionTemplate, useReducedMotion, type MotionValue } from "framer-motion";
import { useCursorSpotlight } from "@/shared/hooks/use-cursor-spotlight";
import { cn } from "@/shared/lib/utils";

const NOISE_TEXTURE =
  "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')";

const PARTICLES = [
  { top: "14%", left: "12%", size: 3, duration: 26 },
  { top: "62%", left: "78%", size: 4, duration: 30 },
  { top: "42%", left: "88%", size: 2, duration: 24 },
  { top: "82%", left: "28%", size: 3, duration: 28 },
] as const;

type AboutLivingBackgroundProps = {
  parallaxY?: MotionValue<number>;
  className?: string;
};

export const AboutLivingBackground = memo(
  ({ parallaxY, className }: AboutLivingBackgroundProps) => {
    const shouldReduceMotion = useReducedMotion();
    const { containerRef, spotlightX, spotlightY, disabled } = useCursorSpotlight();
    const spotlight = useMotionTemplate`radial-gradient(480px circle at ${spotlightX}% ${spotlightY}%, rgba(99,102,241,0.06), transparent 72%)`;

    if (shouldReduceMotion) {
      return (
        <div
          className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
          aria-hidden
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(99,102,241,0.05),transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(9,9,11,0.05),rgba(9,9,11,0.9))]" />
        </div>
      );
    }

    return (
      <motion.div
        ref={containerRef}
        className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
        style={parallaxY ? { y: parallaxY } : undefined}
        aria-hidden
      >
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(99,102,241,0.07),transparent_52%)]"
          animate={{ opacity: [0.65, 1, 0.65], scale: [1, 1.02, 1] }}
          transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_80%,rgba(16,185,129,0.05),transparent_48%)]"
          animate={{ opacity: [0.5, 0.85, 0.5] }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(9,9,11,0.05),rgba(9,9,11,0.5)_55%,rgba(9,9,11,0.92))]" />

        {PARTICLES.map((particle) => (
          <motion.div
            key={`${particle.top}-${particle.left}`}
            className="absolute rounded-full bg-indigo-400/15 blur-[1px]"
            style={{
              top: particle.top,
              left: particle.left,
              width: particle.size,
              height: particle.size,
            }}
            animate={{ y: [0, -8, 3, -5, 0], opacity: [0.3, 0.6, 0.35, 0.55, 0.3] }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}

        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{ backgroundImage: NOISE_TEXTURE }}
        />

        {!disabled && (
          <motion.div className="absolute inset-0" style={{ background: spotlight }} />
        )}
      </motion.div>
    );
  },
);

AboutLivingBackground.displayName = "AboutLivingBackground";
