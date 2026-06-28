"use client";

import { motion, useReducedMotion } from "framer-motion";

type HeroShowcaseVisualProps = {
  monogram: string;
};

const orbitItems = [
  { label: "React", color: "bg-cyan-400/25 text-cyan-200", x: 0, y: -148, delay: 0.1 },
  { label: "Next.js", color: "bg-zinc-300/20 text-zinc-100", x: 128, y: -58, delay: 0.2 },
  { label: "TypeScript", color: "bg-indigo-400/25 text-indigo-100", x: 142, y: 42, delay: 0.3 },
  { label: "Performance", color: "bg-emerald-400/25 text-emerald-100", x: 10, y: 152, delay: 0.4 },
  { label: "Real-time", color: "bg-amber-400/25 text-amber-100", x: -126, y: 68, delay: 0.5 },
  { label: "SaaS", color: "bg-orange-400/25 text-orange-100", x: -132, y: -52, delay: 0.6 },
] as const;

export const HeroShowcaseVisual = ({ monogram }: HeroShowcaseVisualProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[380px]">
      <motion.div
        className="relative aspect-square rounded-[1.6rem] border border-zinc-800/90 bg-zinc-900/55 p-6 backdrop-blur-sm sm:rounded-4xl sm:p-8"
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: [0, -4, 0], scale: 1 }}
        transition={
          shouldReduceMotion
            ? undefined
            : {
                opacity: { duration: 0.55 },
                scale: { duration: 0.55 },
                y: { duration: 5.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              }
        }
      >
        <motion.div
          className="absolute inset-3 rounded-[1.2rem] border border-emerald-500/20 sm:inset-4 sm:rounded-3xl"
          animate={shouldReduceMotion ? undefined : { rotate: 360 }}
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 28, repeat: Number.POSITIVE_INFINITY, ease: "linear" }
          }
        />
        <motion.div
          className="absolute inset-8 rounded-2xl border border-zinc-700/80 sm:inset-10 sm:rounded-[1.25rem]"
          animate={shouldReduceMotion ? undefined : { rotate: -360 }}
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 32, repeat: Number.POSITIVE_INFINITY, ease: "linear" }
          }
        />

        <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-[1.35rem] border border-emerald-400/25 bg-linear-to-br from-emerald-400/20 via-zinc-900 to-zinc-950 shadow-[0_20px_50px_rgba(16,185,129,0.15)] sm:h-44 sm:w-44 sm:rounded-[1.75rem]">
          <div className="flex h-full w-full items-center justify-center rounded-[1.35rem] bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.3),transparent_50%)] sm:rounded-[1.75rem]">
            <span className="text-4xl font-semibold tracking-tight text-zinc-100 sm:text-5xl">{monogram}</span>
          </div>
        </div>

        {orbitItems.map((item) => (
          <motion.div
            key={item.label}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[0.14em] ${item.color}`}
            style={{
              marginLeft: item.x * 0.82,
              marginTop: item.y * 0.82,
            }}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -6, 0],
                    scale: [1, 1.04, 1],
                  }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    duration: 2.8,
                    delay: item.delay,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }
            }
          >
            {item.label}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
