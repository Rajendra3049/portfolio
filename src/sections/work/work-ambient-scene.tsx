"use client";

import { motion, useMotionTemplate, useReducedMotion } from "framer-motion";
import { useCursorSpotlight } from "@/shared/hooks/use-cursor-spotlight";

export const WorkAmbientScene = () => {
  const shouldReduceMotion = useReducedMotion();
  const { containerRef, spotlightX, spotlightY, disabled } = useCursorSpotlight();
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${spotlightX}% ${spotlightY}%, rgba(16,185,129,0.08), transparent 65%)`;

  if (shouldReduceMotion) {
    return (
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.07),transparent_55%)]"
        aria-hidden
      />
    );
  }

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(9,9,11,0.1),rgba(9,9,11,0.75)_55%,rgba(9,9,11,0.95))]" />

      {!disabled ? (
        <motion.div className="absolute inset-0" style={{ background: spotlight }} />
      ) : null}

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

      <div className="absolute inset-0 opacity-[0.03] [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
    </div>
  );
};
