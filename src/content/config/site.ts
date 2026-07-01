import { siteConfigSchema, type SiteConfig } from "@/entities/site";

export const siteConfig: SiteConfig = siteConfigSchema.parse({
  name: "Rajendra Patel",
  domain: "rajendrapatel.dev",
  title: "Rajendra Patel · Frontend Engineer · Production SaaS · React & TypeScript",
  description:
    "Frontend engineer at Omniful — OMS, sales channels, and shipment for 100+ enterprise tenants. 30% faster loads, real-time order systems, intern to team lead in two years. Solo-shipped TaskOrbit and Hisab Diary.",
  tagline: "Frontend engineer shipping production SaaS.",
  primaryCta: {
    label: "View work",
    href: "#work",
  },
  secondaryCta: {
    label: "Get in touch",
    href: "#contact",
  },
  navBrand: {
    monogram: "RP",
    tagline: "Frontend · SaaS",
  },
  navItems: [
    { label: "Home", href: "#home" },
    { label: "Experience", href: "#experience" },
    { label: "Work", href: "#work" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  navCta: {
    label: "Resume",
    href: "/resume",
  },
  socialLinks: [
    { label: "GitHub", href: "https://github.com/Rajendra3049" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rajendra-patel-308237238/",
    },
    { label: "Email", href: "mailto:rajendrapatel0430@gmail.com" },
  ],
});
