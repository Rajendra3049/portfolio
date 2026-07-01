"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";

type UseCursorSpotlightOptions = {
  disabled?: boolean;
};

export const useCursorSpotlight = ({ disabled = false }: UseCursorSpotlightOptions = {}) => {
  const shouldReduceMotion = useReducedMotion();
  const isDisabled = disabled || Boolean(shouldReduceMotion);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);

  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const springX = useSpring(x, { stiffness: 120, damping: 24, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 120, damping: 24, mass: 0.6 });

  useEffect(() => {
    if (isDisabled) {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    const handleMove = (event: MouseEvent) => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        const rect = container.getBoundingClientRect();
        const relativeX = ((event.clientX - rect.left) / rect.width) * 100;
        const relativeY = ((event.clientY - rect.top) / rect.height) * 100;
        x.set(Math.min(100, Math.max(0, relativeX)));
        y.set(Math.min(100, Math.max(0, relativeY)));
      });
    };

    const handleLeave = () => {
      x.set(50);
      y.set(50);
    };

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);

    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isDisabled, x, y]);

  return {
    containerRef,
    spotlightX: springX,
    spotlightY: springY,
    disabled: isDisabled,
  };
};
