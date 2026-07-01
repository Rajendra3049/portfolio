"use client";

import { motion, useMotionTemplate, useReducedMotion } from "framer-motion";
import { useCursorSpotlight } from "@/shared/hooks/use-cursor-spotlight";

const NOISE_TEXTURE =
  "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')";

const PARTICLE_COUNT = 12;

export const FooterAmbientScene = () => {
  const shouldReduceMotion = useReducedMotion();
  const { containerRef, spotlightX, spotlightY, disabled } = useCursorSpotlight();
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${spotlightX}% ${spotlightY}%, rgba(16,185,129,0.07), transparent 68%)`;

  return (
    <div
      ref={disabled ? undefined : containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.1),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.06),transparent_45%)]" />

      {!shouldReduceMotion ? (
        <>
          <motion.div
            className="absolute -left-24 bottom-0 size-[min(60vw,420px)] rounded-full bg-emerald-500/10 blur-3xl"
            animate={{ x: [0, 24, 0], y: [0, -16, 0], opacity: [0.35, 0.5, 0.35] }}
            transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-16 top-1/4 size-[min(50vw,360px)] rounded-full bg-emerald-500/8 blur-3xl"
            animate={{ x: [0, -20, 0], y: [0, 12, 0], opacity: [0.25, 0.4, 0.25] }}
            transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </>
      ) : null}

      {!shouldReduceMotion
        ? Array.from({ length: PARTICLE_COUNT }, (_, index) => (
            <motion.span
              key={index}
              className="absolute size-1 rounded-full bg-emerald-400/30"
              style={{
                left: `${8 + ((index * 17) % 84)}%`,
                top: `${12 + ((index * 23) % 72)}%`,
              }}
              animate={{
                y: [0, -12 - (index % 3) * 4, 0],
                opacity: [0.15, 0.45, 0.15],
              }}
              transition={{
                duration: 6 + (index % 4),
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: index * 0.3,
              }}
            />
          ))
        : null}

      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: NOISE_TEXTURE }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(9,9,11,0.85)_100%)]" />

      {!disabled ? (
        <motion.div className="absolute inset-0" style={{ background: spotlight }} />
      ) : null}
    </div>
  );
};
