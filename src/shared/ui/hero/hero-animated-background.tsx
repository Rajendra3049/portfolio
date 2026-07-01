"use client";

import { memo } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import type { HeroParallaxValues } from "@/shared/hooks/use-hero-parallax";
import { cn } from "@/shared/lib/utils";

const NOISE_TEXTURE =
  "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')";

const RING_COUNT = 7;
const RING_BASE_SIZE = 140;

const PARTICLES = [
  { top: "18%", left: "22%", size: 4, duration: 22, delay: 0 },
  { top: "72%", left: "18%", size: 3, duration: 26, delay: 1.2 },
  { top: "28%", left: "78%", size: 5, duration: 24, delay: 0.6 },
  { top: "64%", left: "82%", size: 3, duration: 28, delay: 1.8 },
  { top: "48%", left: "12%", size: 2, duration: 30, delay: 2.4 },
  { top: "38%", left: "88%", size: 4, duration: 25, delay: 0.9 },
] as const;

type HeroAnimatedBackgroundProps = {
  parallax: HeroParallaxValues;
  className?: string;
};

export const HeroAnimatedBackground = memo(({ parallax, className }: HeroAnimatedBackgroundProps) => {
  const shouldReduceMotion = useReducedMotion();
  const backgroundOpacity = useTransform(parallax.backgroundDarken, (value) => 1 - value);

  if (shouldReduceMotion) {
    return (
      <div
        className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
        aria-hidden
      >
        <StaticHeroLayers />
      </div>
    );
  }

  return (
    <motion.div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={
        parallax.disabled
          ? undefined
          : { scale: parallax.backgroundScale, opacity: backgroundOpacity }
      }
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.14)_0%,rgba(9,9,11,0.4)_45%,rgba(9,9,11,0.95)_72%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(9,9,11,0.85)_100%)]" />

      <RotatingRings />
      <FloatingParticles />
      <AmbientGlow parallax={parallax} />
      <BreathingOverlay />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: NOISE_TEXTURE }}
      />
    </motion.div>
  );
});

HeroAnimatedBackground.displayName = "HeroAnimatedBackground";

const StaticHeroLayers = () => (
  <>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.14)_0%,rgba(9,9,11,0.4)_45%,rgba(9,9,11,0.95)_72%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(9,9,11,0.85)_100%)]" />
    <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
      {Array.from({ length: RING_COUNT }, (_, index) => {
        const size = (index + 1) * RING_BASE_SIZE;
        return (
          <div
            key={size}
            className="absolute left-1/2 top-1/2 rounded-full border border-zinc-700/25"
            style={{
              width: size,
              height: size,
              marginLeft: -size / 2,
              marginTop: -size / 2,
              opacity: 0.35 - index * 0.03,
            }}
          />
        );
      })}
    </div>
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{ backgroundImage: NOISE_TEXTURE }}
    />
  </>
);

const RotatingRings = memo(() => (
  <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
    {Array.from({ length: RING_COUNT }, (_, index) => {
      const size = (index + 1) * RING_BASE_SIZE;
      const duration = 90 + index * 18;
      const direction = index % 2 === 0 ? 1 : -1;

      return (
        <motion.div
          key={size}
          className="absolute left-1/2 top-1/2 rounded-full border border-zinc-700/25"
          style={{
            width: size,
            height: size,
            marginLeft: -size / 2,
            marginTop: -size / 2,
          }}
          initial={{ opacity: 0, scale: 0.94, rotate: 0 }}
          animate={{
            opacity: 0.35 - index * 0.03,
            scale: 1,
            rotate: direction * 360,
          }}
          transition={{
            opacity: { duration: 0.9, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 0.9, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] },
            rotate: { duration, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          }}
        />
      );
    })}
  </div>
));

RotatingRings.displayName = "RotatingRings";

const FloatingParticles = memo(() => (
  <>
    {PARTICLES.map((particle, index) => (
      <motion.div
        key={`${particle.top}-${particle.left}`}
        className="absolute rounded-full bg-emerald-400/20 blur-[1px]"
        style={{
          top: particle.top,
          left: particle.left,
          width: particle.size,
          height: particle.size,
        }}
        animate={{
          y: [0, -12, 4, -8, 0],
          x: [0, 6, -4, 8, 0],
          opacity: [0.25, 0.45, 0.3, 0.5, 0.25],
        }}
        transition={{
          duration: particle.duration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: particle.delay,
        }}
        aria-hidden
      />
    ))}
  </>
));

FloatingParticles.displayName = "FloatingParticles";

const AmbientGlow = memo(({ parallax }: { parallax: HeroParallaxValues }) => (
  <motion.div
    className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2"
    style={
      parallax.disabled
        ? undefined
        : { scale: parallax.glowScale, opacity: parallax.glowOpacity }
    }
  >
    <motion.div
      className="size-[min(72vw,520px)] rounded-full bg-emerald-500/10 blur-3xl"
      animate={parallax.disabled ? undefined : { scale: [1, 1.04, 1] }}
      transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
    />
  </motion.div>
));

AmbientGlow.displayName = "AmbientGlow";

const BreathingOverlay = memo(() => (
  <motion.div
    className="absolute inset-0 bg-emerald-500/[0.02]"
    animate={{ opacity: [0.2, 0.45, 0.2] }}
    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
  />
));

BreathingOverlay.displayName = "BreathingOverlay";
