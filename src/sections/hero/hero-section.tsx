"use client";

import { useRef } from "react";
import { HeroAnimatedBackground } from "@/shared/ui/hero/hero-animated-background";
import { HeroMouseSpotlight } from "@/shared/ui/hero/hero-mouse-spotlight";
import { HeroSectionContent } from "@/shared/ui/hero/hero-section-content";
import { useHeroParallax } from "@/shared/hooks/use-hero-parallax";
import { cn } from "@/shared/lib/utils";

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const parallax = useHeroParallax(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="home"
      className={cn(
        "relative scroll-mt-24 overflow-hidden bg-zinc-950",
        "border-y border-transparent",
      )}
    >
      <HeroAnimatedBackground parallax={parallax} />
      <HeroMouseSpotlight sectionRef={sectionRef} />

      <div className="relative z-10">
        <HeroSectionContent parallax={parallax} />
      </div>
    </section>
  );
};
