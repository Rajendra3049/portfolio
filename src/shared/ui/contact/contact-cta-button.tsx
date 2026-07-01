"use client";

import Link from "next/link";
import { memo, useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { usePointerFine } from "@/shared/hooks/use-pointer-fine";
import { getLinkTargetProps } from "@/shared/lib/link";
import { Magnetic } from "@/shared/ui/magnetic";
import { cn } from "@/shared/lib/utils";

type ContactCtaButtonProps = {
  label: string;
  href: string;
  subtext: string;
};

type Ripple = {
  id: number;
  x: number;
  y: number;
};

export const ContactCtaButton = memo(({ label, href, subtext }: ContactCtaButtonProps) => {
  const shouldReduceMotion = useReducedMotion();
  const isPointerFine = usePointerFine();
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const ripple: Ripple = {
      id: Date.now(),
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    setRipples((current) => [...current, ripple]);
    window.setTimeout(() => {
      setRipples((current) => current.filter((item) => item.id !== ripple.id));
    }, 650);
  }, [shouldReduceMotion]);

  const button = (
    <motion.div
      className="relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={
        shouldReduceMotion || !isPointerFine
          ? undefined
          : { scale: 1.03, transition: { type: "spring", stiffness: 380, damping: 22 } }
      }
      whileTap={
        shouldReduceMotion
          ? undefined
          : { scale: 0.97, transition: { type: "spring", stiffness: 520, damping: 28 } }
      }
    >
      <Link
        href={href}
        onClick={handleClick}
        className={cn(
          "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full",
          "bg-zinc-100 px-8 py-3.5 text-base font-semibold text-zinc-900",
          "shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_12px_40px_rgba(0,0,0,0.35)]",
          "transition-[background-color,box-shadow] duration-300",
          "hover:bg-white hover:shadow-[0_0_28px_rgba(16,185,129,0.18),0_16px_48px_rgba(0,0,0,0.42)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
        )}
        {...getLinkTargetProps(href)}
      >
        {!shouldReduceMotion &&
          ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              className="pointer-events-none absolute rounded-full bg-white/35"
              style={{ left: ripple.x, top: ripple.y, width: 8, height: 8, x: "-50%", y: "-50%" }}
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 18, opacity: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              aria-hidden
            />
          ))}

        <span className="relative z-10">{label}</span>
        <motion.span
          className="relative z-10 inline-flex"
          animate={isHovered && !shouldReduceMotion ? { x: 8 } : { x: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 24 }}
        >
          <ArrowRight className="size-5" aria-hidden />
        </motion.span>
      </Link>
    </motion.div>
  );

  return (
    <div className="flex flex-col items-center text-center">
      <p className="mb-4 max-w-md text-sm text-zinc-400 sm:mb-5 sm:text-base">{subtext}</p>

      {shouldReduceMotion || !isPointerFine ? (
        button
      ) : (
        <Magnetic strength={12}>{button}</Magnetic>
      )}

      {!shouldReduceMotion && (
        <motion.div
          className="pointer-events-none mt-6 h-px w-32 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"
          animate={{ opacity: [0.3, 0.7, 0.3], scaleX: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          aria-hidden
        />
      )}
    </div>
  );
});

ContactCtaButton.displayName = "ContactCtaButton";
