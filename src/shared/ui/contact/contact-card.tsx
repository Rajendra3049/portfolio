"use client";

import Link from "next/link";
import { memo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ContactAction } from "@/content/contact/contact";
import { contactAccentStyles } from "@/shared/lib/contact-accents";
import { useFloatingAnimation } from "@/shared/hooks/use-floating-animation";
import { usePointerFine } from "@/shared/hooks/use-pointer-fine";
import { getLinkTargetProps } from "@/shared/lib/link";
import { ContactAnimatedIcon } from "@/shared/ui/contact/contact-animated-icon";
import { ContactCopyField } from "@/shared/ui/contact/contact-copy-field";
import { ContactMouseSpotlight } from "@/shared/ui/contact/contact-mouse-spotlight";
import { Magnetic } from "@/shared/ui/magnetic";
import { cn } from "@/shared/lib/utils";

type ContactCardProps = {
  action: ContactAction;
  index: number;
};

const glowByAccent = {
  emerald: "rgba(16,185,129,0.14)",
  indigo: "rgba(99,102,241,0.14)",
  amber: "rgba(245,158,11,0.14)",
  zinc: "rgba(255,255,255,0.08)",
} as const;

const iconGlowByAccent = {
  emerald: "shadow-[0_0_22px_rgba(16,185,129,0.28)]",
  indigo: "shadow-[0_0_22px_rgba(99,102,241,0.28)]",
  amber: "shadow-[0_0_22px_rgba(245,158,11,0.24)]",
  zinc: "shadow-[0_0_22px_rgba(255,255,255,0.12)]",
} as const;

const COPY_ROW_HEIGHT = "h-11";

export const ContactCard = memo(({ action, index }: ContactCardProps) => {
  const shouldReduceMotion = useReducedMotion();
  const isPointerFine = usePointerFine();
  const [isHovered, setIsHovered] = useState(false);
  const floating = useFloatingAnimation({ index, amplitude: 3 });
  const accent = contactAccentStyles[action.accent];
  const isExternal = action.href.startsWith("http") || action.href.startsWith("mailto:");
  const hasCopyField = Boolean(action.displayValue && action.copyValue);

  const tileClassName = cn(
    "group/card relative flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-zinc-900/60",
    accent.border,
    "transition-[border-color,box-shadow,background-color] duration-300",
    "hover:bg-zinc-900/75 hover:shadow-[0_22px_50px_rgba(0,0,0,0.38)]",
  );

  const cardBody = (
    <>
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                opacity: isHovered ? [0.28, 0.42, 0.28] : [0.16, 0.28, 0.16],
              }
        }
        transition={{
          duration: isHovered ? 2.8 : 5.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: index * 0.35,
        }}
        style={{ background: accent.glow }}
        aria-hidden
      />

      <div className="relative flex flex-1 flex-col p-6 pb-4">
        <Link
          href={action.href}
          className={cn(
            "grid min-h-0 flex-1 cursor-pointer grid-rows-[2.5rem_1fr] gap-6 outline-none",
            "focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
          )}
          {...getLinkTargetProps(action.href)}
          {...(isExternal ? { "aria-label": `${action.title} (opens in new tab)` } : {})}
        >
          <div className="flex items-start justify-between gap-3">
            <span
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950/80 transition-shadow duration-300",
                accent.icon,
                isHovered && iconGlowByAccent[action.accent],
              )}
              style={{ transformStyle: "preserve-3d" }}
            >
              <ContactAnimatedIcon
                id={action.id}
                className={accent.icon}
                isHovered={isHovered}
              />
            </span>

            <motion.span
              className={cn("inline-flex size-5 shrink-0 items-center justify-center", accent.arrow)}
              animate={
                shouldReduceMotion || !isHovered ? { x: 0, y: 0 } : { x: 8, y: -8 }
              }
              transition={{ type: "spring", stiffness: 380, damping: 24 }}
            >
              <ArrowUpRight className="size-5" aria-hidden />
            </motion.span>
          </div>

          <div className="flex min-h-0 flex-col">
            <h3 className="text-lg font-semibold leading-tight text-zinc-50 sm:text-xl">
              {action.title}
            </h3>
            <p className="mt-1.5 text-sm leading-6 text-zinc-400">{action.description}</p>
          </div>
        </Link>

        <div className={cn("mt-4 shrink-0", COPY_ROW_HEIGHT)}>
          {hasCopyField ? (
            <ContactCopyField
              displayValue={action.displayValue!}
              copyValue={action.copyValue!}
            />
          ) : (
            <div className={COPY_ROW_HEIGHT} aria-hidden />
          )}
        </div>
      </div>
    </>
  );

  if (shouldReduceMotion) {
    return <div className={tileClassName}>{cardBody}</div>;
  }

  const interactiveCard = (
    <motion.div className="h-full w-full min-w-0" {...floating}>
      <ContactMouseSpotlight className="h-full w-full min-w-0" glowColor={glowByAccent[action.accent]}>
        <motion.div
          className={cn(tileClassName, "h-full w-full min-w-0")}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={
            isPointerFine
              ? { y: -6, scale: 1.02, transition: { type: "spring", stiffness: 380, damping: 26 } }
              : undefined
          }
        >
          {cardBody}
        </motion.div>
      </ContactMouseSpotlight>
    </motion.div>
  );

  if (!isPointerFine) {
    return interactiveCard;
  }

  return (
    <Magnetic strength={6} className="flex h-full w-full min-w-0">
      {interactiveCard}
    </Magnetic>
  );
});

ContactCard.displayName = "ContactCard";
