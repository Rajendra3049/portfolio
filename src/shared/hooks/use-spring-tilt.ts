"use client";

import { useMemo, useRef } from "react";
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from "framer-motion";

type SpringTiltOptions = {
  maxRotationDeg?: number;
  stiffness?: number;
  damping?: number;
};

type SpringTiltResult = {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  glareX: MotionValue<number>;
  glareY: MotionValue<number>;
  onMouseMove: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: () => void;
  disabled: boolean;
};

export const useSpringTilt = ({
  maxRotationDeg = 3,
  stiffness = 260,
  damping = 22,
}: SpringTiltOptions = {}): SpringTiltResult => {
  const shouldReduceMotion = useReducedMotion();
  const disabled = Boolean(shouldReduceMotion);
  const elementRef = useRef<HTMLElement | null>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springConfig = useMemo(
    () => ({ stiffness, damping, mass: 0.45 }),
    [damping, stiffness],
  );

  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  const springGlareX = useSpring(glareX, springConfig);
  const springGlareY = useSpring(glareY, springConfig);

  const onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    rotateX.set((0.5 - y) * maxRotationDeg * 2);
    rotateY.set((x - 0.5) * maxRotationDeg * 2);
    glareX.set(x * 100);
    glareY.set(y * 100);
    elementRef.current = event.currentTarget;
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
    elementRef.current = null;
  };

  return {
    rotateX: springRotateX,
    rotateY: springRotateY,
    glareX: springGlareX,
    glareY: springGlareY,
    onMouseMove,
    onMouseLeave,
    disabled,
  };
};
