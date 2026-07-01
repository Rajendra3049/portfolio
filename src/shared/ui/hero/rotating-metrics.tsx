"use client";

import { memo, useEffect, useState } from "react";
import { Check } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { heroContent } from "@/content/hero/hero";
import { heroEase } from "@/shared/lib/motion/hero-variants";
import { cn } from "@/shared/lib/utils";

type RotatingMetricsProps = {
  metrics?: readonly string[];
  label?: string;
  intervalMs?: number;
  className?: string;
};

export const RotatingMetrics = memo(
  ({
    metrics = heroContent.impactMetrics,
    label = heroContent.impactLabel,
    intervalMs = 3000,
    className,
  }: RotatingMetricsProps) => {
    const shouldReduceMotion = useReducedMotion();
    const [index, setIndex] = useState(0);

    useEffect(() => {
      if (shouldReduceMotion || metrics.length <= 1) {
        return;
      }

      const timer = window.setInterval(() => {
        setIndex((current) => (current + 1) % metrics.length);
      }, intervalMs);

      return () => window.clearInterval(timer);
    }, [intervalMs, metrics.length, shouldReduceMotion]);

    return (
      <div className={cn("flex w-full max-w-xl flex-col items-center gap-2", className)}>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">{label}</p>

        {shouldReduceMotion ? (
          <p className="flex items-center gap-2 text-sm leading-6 text-zinc-400 sm:text-base">
            <Check className="size-3.5 shrink-0 text-emerald-500" aria-hidden />
            <span>{metrics[0]}</span>
          </p>
        ) : (
          <div
            className="relative h-6 w-full overflow-hidden sm:h-7"
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={metrics[index]}
                className="absolute inset-0 flex items-center justify-center gap-2 px-2 text-sm leading-6 text-zinc-400 sm:text-base"
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.45, ease: heroEase }}
              >
                <Check className="size-3.5 shrink-0 text-emerald-500" aria-hidden />
                <span>{metrics[index]}</span>
              </motion.p>
            </AnimatePresence>
          </div>
        )}
      </div>
    );
  },
);

RotatingMetrics.displayName = "RotatingMetrics";
