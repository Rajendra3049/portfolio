"use client";

import { useEffect, useMemo, useState } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";

type UseMagneticOptions = {
  strength?: number;
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

export const useMagnetic = ({
  strength = 12,
  disabled = false,
}: UseMagneticOptions = {}) => {
  const shouldReduceMotion = useReducedMotion();
  const hasFinePointer = useFinePointer();
  const isDisabled = disabled || Boolean(shouldReduceMotion) || !hasFinePointer;

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

  const onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (isDisabled) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    x.set((offsetX / rect.width) * strength);
    y.set((offsetY / rect.height) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    isDisabled,
    style: isDisabled ? undefined : { x: springX, y: springY },
    onMouseMove,
    onMouseLeave,
  };
};
