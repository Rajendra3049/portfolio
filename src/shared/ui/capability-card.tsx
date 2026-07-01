"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { type SkillCapability, type SkillCapabilityAccent } from "@/content/skills/skills";
import {
  capabilityCardShellVariants,
  capabilityReducedVariants,
} from "@/shared/lib/motion/capability-variants";
import { CapabilityAnimatedIcon } from "@/shared/ui/capabilities/capability-animated-icon";
import { ProofWithMetrics } from "@/shared/ui/capabilities/proof-with-metrics";
import { SpotlightSurface } from "@/shared/ui/capabilities/spotlight-surface";
import { cn } from "@/shared/lib/utils";

type CapabilityCardProps = {
  capability: SkillCapability;
  variants?: Variants;
};

const accentStyles: Record<
  SkillCapabilityAccent,
  { border: string; icon: string; dot: string; glow: string }
> = {
  indigo: {
    border: "border-t-indigo-500/70",
    icon: "text-indigo-400",
    dot: "bg-indigo-500",
    glow: "group-hover:shadow-[0_0_14px_rgba(99,102,241,0.35)]",
  },
  emerald: {
    border: "border-t-emerald-500/70",
    icon: "text-emerald-400",
    dot: "bg-emerald-500",
    glow: "group-hover:shadow-[0_0_14px_rgba(16,185,129,0.35)]",
  },
  zinc: {
    border: "border-t-zinc-500/70",
    icon: "text-zinc-400",
    dot: "bg-zinc-500",
    glow: "group-hover:shadow-[0_0_14px_rgba(161,161,170,0.2)]",
  },
  amber: {
    border: "border-t-amber-500/70",
    icon: "text-amber-400",
    dot: "bg-amber-500",
    glow: "group-hover:shadow-[0_0_14px_rgba(245,158,11,0.3)]",
  },
};

export const CapabilityCard = ({ capability, variants }: CapabilityCardProps) => {
  const shouldReduceMotion = useReducedMotion();
  const shellVariants = shouldReduceMotion ? capabilityReducedVariants : capabilityCardShellVariants;
  const styles = accentStyles[capability.accent];

  const content = (
    <>
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span
            className={cn(
              "mt-0.5 flex size-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950/80 transition-colors duration-300 group-hover/spotlight:border-zinc-700",
              styles.icon,
              styles.glow,
            )}
          >
            <CapabilityAnimatedIcon title={capability.title} />
          </span>
          <div>
            <h3 className="text-base font-semibold text-zinc-50 sm:text-lg">{capability.title}</h3>
            <p className="mt-1 text-sm leading-6 text-zinc-400">{capability.tagline}</p>
          </div>
        </div>
        <motion.span
          className={cn("mt-2 size-2 shrink-0 rounded-full", styles.dot)}
          animate={shouldReduceMotion ? undefined : { scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{
            duration: 3.2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          aria-hidden
        />
      </div>

      <div className="relative mt-4">
        <Link
          href={capability.proofHref}
          className="interactive-link inline-flex cursor-pointer items-start gap-1.5 text-sm leading-6 text-zinc-300 transition-colors hover:text-zinc-100"
        >
          <span className={cn("mt-2 size-1.5 shrink-0 rounded-full", styles.dot)} aria-hidden />
          <span>
            <ProofWithMetrics proof={capability.proof} />
            <ArrowUpRight
              className="ml-1 inline size-3.5 text-zinc-500 transition-transform group-hover/spotlight:-translate-y-px group-hover/spotlight:translate-x-px group-hover/spotlight:text-zinc-300"
              aria-hidden
            />
          </span>
        </Link>
      </div>
    </>
  );

  if (shouldReduceMotion) {
    return (
      <article
        className={cn(
          "flex h-full flex-col rounded-xl border border-zinc-800 border-t-2 bg-zinc-900/90 p-4 sm:p-5",
          styles.border,
        )}
      >
        {content}
      </article>
    );
  }

  return (
    <motion.div variants={variants ?? shellVariants}>
      <SpotlightSurface
        className={cn(
          "group/spotlight flex h-full flex-col rounded-xl border border-zinc-800 border-t-2 bg-zinc-900/90 p-4 sm:p-5",
          "transition-[border-color,box-shadow] duration-300 hover:border-zinc-600 hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)]",
          styles.border,
        )}
      >
        {content}
      </SpotlightSurface>
    </motion.div>
  );
};
