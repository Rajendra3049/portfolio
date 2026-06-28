"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type AnimatedCounterProps = {
  value: number;
  durationMs?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

const easeOutCubic = (progress: number) => 1 - (1 - progress) ** 3;

export const AnimatedCounter = ({
  value,
  durationMs = 1000,
  prefix = "",
  suffix = "",
  className,
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    if (shouldReduceMotion) {
      const frameId = window.requestAnimationFrame(() => {
        setDisplayValue(value);
      });
      return () => {
        window.cancelAnimationFrame(frameId);
      };
    }

    if (value === 0) {
      return;
    }

    let animationFrameId = 0;
    const startAt = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startAt;
      const progress = Math.min(1, elapsed / durationMs);
      const eased = easeOutCubic(progress);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(tick);
      }
    };

    animationFrameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [durationMs, isInView, shouldReduceMotion, value]);

  return (
    <span ref={ref} className={className} aria-live="polite">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};
