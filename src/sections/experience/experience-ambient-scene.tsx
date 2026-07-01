"use client";

import { motion, useMotionTemplate, useReducedMotion } from "framer-motion";
import { useCursorSpotlight } from "@/shared/hooks/use-cursor-spotlight";

export const ExperienceAmbientScene = () => {
  const shouldReduceMotion = useReducedMotion();
  const { containerRef, spotlightX, spotlightY, disabled } = useCursorSpotlight();
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${spotlightX}% ${spotlightY}%, rgba(16,185,129,0.07), transparent 68%)`;

  if (shouldReduceMotion) {
    return (
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(16,185,129,0.06),transparent_50%)]"
        aria-hidden
      />
    );
  }

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(16,185,129,0.07),transparent_52%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(9,9,11,0.05),rgba(9,9,11,0.55)_60%,rgba(9,9,11,0.9))]" />

      {!disabled ? (
        <motion.div className="absolute inset-0" style={{ background: spotlight }} />
      ) : null}

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
    </div>
  );
};
