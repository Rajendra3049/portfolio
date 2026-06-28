"use client";

import type { PropsWithChildren } from "react";
import { useMemo } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/shared/lib/utils";

type MagneticProps = PropsWithChildren<{
  className?: string;
  strength?: number;
}>;

export const Magnetic = ({ children, className, strength = 12 }: MagneticProps) => {
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = useMemo(
    () => ({
      stiffness: 260,
      damping: 18,
      mass: 0.5,
    }),
    [],
  );

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("inline-flex", className)}
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const offsetX = event.clientX - rect.left - rect.width / 2;
        const offsetY = event.clientY - rect.top - rect.height / 2;

        x.set((offsetX / rect.width) * strength);
        y.set((offsetY / rect.height) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};
