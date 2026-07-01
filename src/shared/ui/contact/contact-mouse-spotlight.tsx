"use client";

import { memo, type PropsWithChildren } from "react";
import { motion, useMotionTemplate, useReducedMotion } from "framer-motion";
import { useCursorSpotlight } from "@/shared/hooks/use-cursor-spotlight";
import { usePointerFine } from "@/shared/hooks/use-pointer-fine";
import { cn } from "@/shared/lib/utils";

type ContactMouseSpotlightProps = PropsWithChildren<{
  className?: string;
  glowColor?: string;
}>;

export const ContactMouseSpotlight = memo(
  ({ children, className, glowColor = "rgba(16,185,129,0.14)" }: ContactMouseSpotlightProps) => {
    const shouldReduceMotion = useReducedMotion();
    const isPointerFine = usePointerFine();
    const disabled = shouldReduceMotion || !isPointerFine;
    const { containerRef, spotlightX, spotlightY } = useCursorSpotlight({ disabled });
    const spotlight = useMotionTemplate`radial-gradient(260px circle at ${spotlightX}% ${spotlightY}%, ${glowColor}, transparent 72%)`;

    if (disabled) {
      return <div className={cn("group/spotlight relative", className)}>{children}</div>;
    }

    return (
      <div
        ref={containerRef}
        className={cn("group/spotlight relative", className)}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
          style={{ background: spotlight }}
          aria-hidden
        />
        {children}
      </div>
    );
  },
);

ContactMouseSpotlight.displayName = "ContactMouseSpotlight";
