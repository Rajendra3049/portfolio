"use client";

import { memo } from "react";
import { motion, useMotionTemplate, useReducedMotion, type MotionValue } from "framer-motion";
import { useCursorSpotlight } from "@/shared/hooks/use-cursor-spotlight";
import { cn } from "@/shared/lib/utils";

const NOISE_TEXTURE =
  "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')";

const PARTICLES = [
  { top: "18%", left: "22%", size: 3, duration: 28 },
  { top: "72%", left: "68%", size: 4, duration: 32 },
  { top: "48%", left: "84%", size: 2, duration: 26 },
  { top: "86%", left: "36%", size: 3, duration: 30 },
  { top: "32%", left: "8%", size: 2, duration: 24 },
] as const;

type ContactLivingBackgroundProps = {
  parallaxY?: MotionValue<number>;
  className?: string;
};

export const ContactLivingBackground = memo(
  ({ parallaxY, className }: ContactLivingBackgroundProps) => {
    const shouldReduceMotion = useReducedMotion();
    const { containerRef, spotlightX, spotlightY, disabled } = useCursorSpotlight();
    const spotlight = useMotionTemplate`radial-gradient(560px circle at ${spotlightX}% ${spotlightY}%, rgba(16,185,129,0.08), transparent 72%)`;

    if (shouldReduceMotion) {
      return (
        <div
          className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
          aria-hidden
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(16,185,129,0.06),transparent_55%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(9,9,11,0.05),rgba(9,9,11,0.92))]" />
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
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(16,185,129,0.09),transparent_55%)]"
          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.02, 1] }}
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,rgba(99,102,241,0.05),transparent_48%)]"
          animate={{ opacity: [0.4, 0.75, 0.4] }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 3,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(9,9,11,0.05),rgba(9,9,11,0.5)_50%,rgba(9,9,11,0.95))]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(9,9,11,0.55)_100%)]" />

        {PARTICLES.map((particle) => (
          <motion.div
            key={`${particle.top}-${particle.left}`}
            className="absolute rounded-full bg-emerald-400/15 blur-[1px]"
            style={{
              top: particle.top,
              left: particle.left,
              width: particle.size,
              height: particle.size,
            }}
            animate={{ y: [0, -10, 4, -6, 0], opacity: [0.25, 0.55, 0.3, 0.5, 0.25] }}
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

ContactLivingBackground.displayName = "ContactLivingBackground";
