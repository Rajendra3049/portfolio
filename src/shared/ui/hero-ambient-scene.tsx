"use client";

import { motion, useReducedMotion } from "framer-motion";

export const HeroAmbientScene = () => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_55%)]"
        aria-hidden
      />
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.09),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(24,24,27,0.08),rgba(9,9,11,0.52)_38%,rgba(9,9,11,0.9))]" />

      <motion.div
        className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-emerald-500/16 blur-3xl"
        animate={{
          x: [0, 22, 0, -8, 0],
          y: [0, 14, 18, 6, 0],
          scale: [1, 1.09, 1.04, 1.1, 1],
        }}
        transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute right-[-120px] top-20 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl"
        animate={{
          x: [0, -20, -8, -28, 0],
          y: [0, 16, -6, 10, 0],
          scale: [1, 1.07, 1.03, 1.1, 1],
        }}
        transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.6 }}
      />

      <motion.div
        className="absolute bottom-[-180px] left-[28%] h-[460px] w-[460px] rounded-full bg-emerald-300/8 blur-3xl"
        animate={{
          x: [0, 8, -18, 12, 0],
          y: [0, -18, -12, -24, 0],
          scale: [1, 1.04, 1.09, 1.05, 1],
        }}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.2 }}
      />
    </div>
  );
};
