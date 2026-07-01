"use client";

import { memo, type PropsWithChildren } from "react";
import { motion, useMotionTemplate, useReducedMotion } from "framer-motion";
import { useSpringTilt } from "@/shared/hooks/use-spring-tilt";
import { cn } from "@/shared/lib/utils";

type SpotlightSurfaceProps = PropsWithChildren<{
  className?: string;
  glowClassName?: string;
  tilt?: boolean;
}>;

export const SpotlightSurface = memo(
  ({ children, className, glowClassName, tilt = true }: SpotlightSurfaceProps) => {
    const shouldReduceMotion = useReducedMotion();
    const { rotateX, rotateY, glareX, glareY, onMouseMove, onMouseLeave, disabled } =
      useSpringTilt({ maxRotationDeg: 2.5, stiffness: 240, damping: 24 });

    const spotlight = useMotionTemplate`radial-gradient(220px circle at ${glareX}% ${glareY}%, rgba(16,185,129,0.14), transparent 72%)`;

    if (shouldReduceMotion || disabled) {
      return <div className={className}>{children}</div>;
    }

    return (
      <motion.div
        className={cn("group/spotlight relative", className)}
        style={
          tilt
            ? {
                rotateX,
                rotateY,
                transformPerspective: 900,
                transformStyle: "preserve-3d",
              }
            : undefined
        }
        onMouseMove={tilt ? onMouseMove : undefined}
        onMouseLeave={tilt ? onMouseLeave : undefined}
        whileHover={{ y: -3, transition: { type: "spring", stiffness: 360, damping: 24 } }}
      >
        <motion.div
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100",
            glowClassName,
          )}
          style={{ background: spotlight }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/spotlight:opacity-100" />
        {children}
      </motion.div>
    );
  },
);

SpotlightSurface.displayName = "SpotlightSurface";
