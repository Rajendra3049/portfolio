"use client";

import { memo } from "react";
import { motion, useMotionTemplate, useReducedMotion, type MotionValue } from "framer-motion";
import { useCursorSpotlight } from "@/shared/hooks/use-cursor-spotlight";
import { cn } from "@/shared/lib/utils";

const NOISE_TEXTURE =
  "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')";

const GRID_PATTERN =
  "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)";

const PARTICLES = [
  { top: "12%", left: "18%", size: 3, duration: 24 },
  { top: "68%", left: "82%", size: 4, duration: 28 },
  { top: "38%", left: "72%", size: 2, duration: 22 },
  { top: "78%", left: "24%", size: 3, duration: 26 },
  { top: "22%", left: "88%", size: 2, duration: 30 },
] as const;

type CapabilitiesLivingBackgroundProps = {
  parallaxY?: MotionValue<number>;
  className?: string;
};

export const CapabilitiesLivingBackground = memo(
  ({ parallaxY, className }: CapabilitiesLivingBackgroundProps) => {
    const shouldReduceMotion = useReducedMotion();
    const { containerRef, spotlightX, spotlightY, disabled } = useCursorSpotlight();
    const spotlight = useMotionTemplate`radial-gradient(520px circle at ${spotlightX}% ${spotlightY}%, rgba(16,185,129,0.07), transparent 70%)`;

    if (shouldReduceMotion) {
      return (
        <div
          className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
          aria-hidden
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_0%,rgba(16,185,129,0.06),transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(9,9,11,0.05),rgba(9,9,11,0.88))]" />
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
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_0%,rgba(16,185,129,0.08),transparent_52%)]"
          animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.03, 1] }}
          transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(9,9,11,0.05),rgba(9,9,11,0.5)_55%,rgba(9,9,11,0.9))]" />

        <motion.div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage: GRID_PATTERN,
            backgroundSize: "56px 56px",
          }}
          animate={{ backgroundPosition: ["0px 0px", "56px 56px"] }}
          transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {PARTICLES.map((particle) => (
          <motion.div
            key={`${particle.top}-${particle.left}`}
            className="absolute rounded-full bg-emerald-400/20 blur-[1px]"
            style={{
              top: particle.top,
              left: particle.left,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -10, 4, -6, 0],
              x: [0, 5, -3, 6, 0],
              opacity: [0.2, 0.45, 0.3, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}

        <motion.div
          className="absolute -right-16 top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"
          animate={{
            x: [0, -12, 8, -10, 0],
            y: [0, 8, 4, -6, 0],
            scale: [1, 1.05, 1.02, 1.06, 1],
          }}
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -left-24 bottom-16 h-56 w-56 rounded-full bg-emerald-400/8 blur-3xl"
          animate={{
            x: [0, 14, -6, 10, 0],
            y: [0, -6, 8, 2, 0],
            scale: [1, 1.04, 1.01, 1.05, 1],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
        />

        <motion.div
          className="absolute inset-0 bg-emerald-500/[0.02]"
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 11, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        {!disabled ? (
          <motion.div className="absolute inset-0" style={{ background: spotlight }} />
        ) : null}

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: NOISE_TEXTURE }}
        />
      </motion.div>
    );
  },
);

CapabilitiesLivingBackground.displayName = "CapabilitiesLivingBackground";
