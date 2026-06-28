"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

type HeroProofTickerProps = {
  metrics: readonly { label: string; value: string }[];
};

export const HeroProofTicker = ({ metrics }: HeroProofTickerProps) => {
  const shouldReduceMotion = useReducedMotion();

  const items = useMemo(
    () =>
      metrics.map((metric) => ({
        id: metric.label,
        text: `${metric.label}: ${metric.value}`,
      })),
    [metrics],
  );

  if (items.length === 0) {
    return null;
  }

  if (shouldReduceMotion) {
    return (
      <div className="mt-6 rounded-xl border border-zinc-800/90 bg-zinc-900/70 px-4 py-3">
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-zinc-300 sm:text-sm">
          {items.map((item) => (
            <li key={item.id} className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-emerald-400/80" aria-hidden />
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] mt-6 overflow-hidden rounded-xl border border-zinc-800/90 bg-zinc-900/70 py-3">
      <motion.div
        className="flex w-max items-center gap-5 px-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item.id}-${index}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-300 sm:text-sm"
          >
            <span className="size-1.5 rounded-full bg-emerald-400/80" aria-hidden />
            {item.text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
