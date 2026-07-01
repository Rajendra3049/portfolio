"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/shared/lib/utils";

type ContactAvailabilityProps = {
  status: string;
  joiner: string;
  responseTime: string;
};

export const ContactAvailability = memo(
  ({ status, joiner, responseTime }: ContactAvailabilityProps) => {
    const shouldReduceMotion = useReducedMotion();

    return (
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <motion.div
          className={cn(
            "relative inline-flex w-fit items-center gap-2.5 overflow-hidden rounded-full border border-emerald-500/25 bg-emerald-500/8 px-3.5 py-2",
          )}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  boxShadow: [
                    "0 0 0 0 rgba(16,185,129,0)",
                    "0 0 24px 0 rgba(16,185,129,0.12)",
                    "0 0 0 0 rgba(16,185,129,0)",
                  ],
                }
          }
          transition={{
            duration: 4.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <span className="relative flex size-2 shrink-0" aria-hidden>
            {!shouldReduceMotion && (
              <motion.span
                className="absolute inline-flex size-full rounded-full bg-emerald-400/50"
                animate={{ scale: [1, 1.6, 1], opacity: [0.45, 0, 0.45] }}
                transition={{
                  duration: 3.2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            )}
            <motion.span
              className="relative inline-flex size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.55)]"
              animate={
                shouldReduceMotion
                  ? undefined
                  : { opacity: [0.85, 1, 0.85], scale: [1, 1.05, 1] }
              }
              transition={{
                duration: 3.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </span>
          <span className="text-sm font-medium text-emerald-100">{status}</span>
        </motion.div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-400">
          <span>{joiner}</span>
          <span className="hidden text-zinc-600 sm:inline" aria-hidden>
            ·
          </span>
          <span>{responseTime}</span>
        </div>
      </div>
    );
  },
);

ContactAvailability.displayName = "ContactAvailability";
