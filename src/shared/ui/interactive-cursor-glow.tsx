"use client";

import { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useIsFinePointer } from "@/shared/hooks/use-mouse-position";

export const InteractiveCursorGlow = () => {
  const shouldReduceMotion = useReducedMotion();
  const isFinePointer = useIsFinePointer();
  const disabled = shouldReduceMotion || !isFinePointer;

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 110, damping: 26, mass: 0.55 });
  const springY = useSpring(y, { stiffness: 110, damping: 26, mass: 0.55 });
  const glow = useMotionTemplate`radial-gradient(240px circle at ${springX}px ${springY}px, rgba(16,185,129,0.07), transparent 72%)`;

  useEffect(() => {
    if (disabled) {
      return;
    }

    const frameRef = { current: null as number | null };

    const handleMove = (event: MouseEvent) => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        x.set(event.clientX);
        y.set(event.clientY);
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [disabled, x, y]);

  if (disabled) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[45]"
      style={{ background: glow }}
      aria-hidden
    />
  );
};
