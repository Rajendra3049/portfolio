"use client";

import { useEffect, useState, type RefObject } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";

type UseMousePositionOptions = {
  disabled?: boolean;
};

export const useIsFinePointer = () => {
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setIsFinePointer(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isFinePointer;
};

export const useMousePosition = (
  boundsRef: RefObject<HTMLElement | null>,
  { disabled = false }: UseMousePositionOptions = {},
) => {
  const shouldReduceMotion = useReducedMotion();
  const isFinePointer = useIsFinePointer();
  const isDisabled = disabled || shouldReduceMotion || !isFinePointer;

  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const springX = useSpring(x, { stiffness: 90, damping: 22, mass: 0.7 });
  const springY = useSpring(y, { stiffness: 90, damping: 22, mass: 0.7 });

  useEffect(() => {
    if (isDisabled) {
      return;
    }

    const bounds = boundsRef.current;
    if (!bounds) {
      return;
    }

    const frameRef = { current: null as number | null };

    const handleMove = (event: MouseEvent) => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        const rect = bounds.getBoundingClientRect();
        const relativeX = ((event.clientX - rect.left) / rect.width) * 100;
        const relativeY = ((event.clientY - rect.top) / rect.height) * 100;

        if (relativeX < 0 || relativeX > 100 || relativeY < 0 || relativeY > 100) {
          return;
        }

        x.set(Math.min(100, Math.max(0, relativeX)));
        y.set(Math.min(100, Math.max(0, relativeY)));
      });
    };

    const handleLeave = () => {
      x.set(50);
      y.set(50);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    bounds.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      bounds.removeEventListener("mouseleave", handleLeave);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [boundsRef, isDisabled, x, y]);

  return {
    x: springX,
    y: springY,
    disabled: isDisabled,
  };
};
