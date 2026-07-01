"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

type UseMouseSpotlightOptions = {
  size?: number;
  color?: string;
  disabled?: boolean;
};

const useFinePointer = () => {
  const [hasFinePointer, setHasFinePointer] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const update = () => setHasFinePointer(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return hasFinePointer;
};

export const useMouseSpotlight = ({
  size = 220,
  color = "rgba(16,185,129,0.16)",
  disabled = false,
}: UseMouseSpotlightOptions = {}) => {
  const shouldReduceMotion = useReducedMotion();
  const hasFinePointer = useFinePointer();
  const isDisabled = disabled || Boolean(shouldReduceMotion) || !hasFinePointer;
  const [isHovered, setIsHovered] = useState(false);
  const frameRef = useRef<number | null>(null);

  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const springX = useSpring(x, { stiffness: 140, damping: 22, mass: 0.55 });
  const springY = useSpring(y, { stiffness: 140, damping: 22, mass: 0.55 });

  const spotlight = useMotionTemplate`radial-gradient(${size}px circle at ${springX}% ${springY}%, ${color}, transparent 72%)`;

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (isDisabled) {
      return;
    }

    if (frameRef.current !== null) {
      return;
    }

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      const rect = event.currentTarget.getBoundingClientRect();
      const relativeX = ((event.clientX - rect.left) / rect.width) * 100;
      const relativeY = ((event.clientY - rect.top) / rect.height) * 100;
      x.set(Math.min(100, Math.max(0, relativeX)));
      y.set(Math.min(100, Math.max(0, relativeY)));
    });
  };

  const onMouseEnter = () => setIsHovered(true);

  const onMouseLeave = () => {
    setIsHovered(false);
    x.set(50);
    y.set(50);
  };

  return {
    isDisabled,
    isHovered,
    spotlight,
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
  };
};
