"use client";

import { memo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Gauge, Layers, Zap } from "lucide-react";
import type { AboutOptimizeArea } from "@/content/about/about";
import { aboutAccentStyles } from "@/shared/lib/about-accents";
import { SpotlightSurface } from "@/shared/ui/capabilities/spotlight-surface";
import { cn } from "@/shared/lib/utils";

type AboutOptimizeCardProps = {
  area: AboutOptimizeArea;
  index: number;
};

const OptimizeIcon = ({ title, className }: { title: string; className?: string }) => {
  const props = { className: cn("size-4", className), "aria-hidden": true as const };

  switch (title) {
    case "Performance":
      return <Gauge {...props} />;
    case "Real-time":
      return <Zap {...props} />;
    case "Foundations":
      return <Layers {...props} />;
    default:
      return <Gauge {...props} />;
  }
};

export const AboutOptimizeCard = memo(({ area, index }: AboutOptimizeCardProps) => {
  const shouldReduceMotion = useReducedMotion();
  const [isExpanded, setIsExpanded] = useState(false);
  const accent = aboutAccentStyles[area.accent];

  const handleToggle = () => {
    if (!shouldReduceMotion) {
      setIsExpanded((prev) => !prev);
    }
  };

  if (shouldReduceMotion) {
    return (
      <article
        className={cn(
          "rounded-xl border bg-zinc-900/60 p-4",
          accent.border,
        )}
      >
        <div className="flex items-start gap-3">
          <span
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950/80",
              accent.icon,
            )}
          >
            <OptimizeIcon title={area.title} className={accent.icon} />
          </span>
          <div>
            <h4 className="text-sm font-semibold text-zinc-100">{area.title}</h4>
            <p className="mt-1 text-sm text-zinc-300">{area.headline}</p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">{area.detail}</p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <div
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onFocus={() => setIsExpanded(true)}
      onBlur={() => setIsExpanded(false)}
      onClick={handleToggle}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleToggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
    >
      <SpotlightSurface
        className={cn(
          "rounded-xl border bg-zinc-900/60 p-4",
          accent.border,
          accent.hoverBorder,
          "cursor-default transition-[border-color,box-shadow] duration-300",
          "hover:shadow-[0_14px_36px_rgba(0,0,0,0.28)]",
        )}
      >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl"
        animate={{ opacity: isExpanded ? 0.45 : 0.2 }}
        transition={{ duration: 0.35 }}
        style={{ background: accent.glow }}
        aria-hidden
      />

      <div className="relative flex items-start gap-3">
        <motion.span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950/80",
            accent.icon,
          )}
          animate={
            isExpanded
              ? { scale: 1.08, rotate: index % 2 === 0 ? 4 : -4 }
              : { scale: 1, rotate: 0 }
          }
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
        >
          <OptimizeIcon title={area.title} className={accent.icon} />
        </motion.span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-semibold text-zinc-100">{area.title}</h4>
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-zinc-500"
              aria-hidden
            >
              <ChevronDown className="size-4" />
            </motion.span>
          </div>
          <p className="mt-1 text-sm text-zinc-300">{area.headline}</p>

          <motion.div
            initial={false}
            animate={{
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0,
              marginTop: isExpanded ? 8 : 0,
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm leading-6 text-zinc-400">{area.detail}</p>
          </motion.div>
        </div>
      </div>
      </SpotlightSurface>
    </div>
  );
});

AboutOptimizeCard.displayName = "AboutOptimizeCard";
