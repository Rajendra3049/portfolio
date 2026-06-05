import { AboutSection } from "@/sections/about/about-section";
import { ContactSection } from "@/sections/contact/contact-section";
import { EngineeringFocusSection } from "@/sections/engineering-focus/engineering-focus-section";
import { ExperienceSection } from "@/sections/experience/experience-section";
import { HeroSection } from "@/sections/hero/hero-section";
import { FeaturedWorkSection } from "@/sections/work/featured-work-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ExperienceSection />
      <FeaturedWorkSection />
      <EngineeringFocusSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
