import { siteConfigSchema, type SiteConfig } from "@/entities/site";

export const siteConfig: SiteConfig = siteConfigSchema.parse({
  name: "Rajendra Patel",
  domain: "rajendrapatel.dev",
  title: "Rajendra Patel | Software Engineer · React, Next.js, TypeScript · SaaS",
  description:
    "Software Engineer with production SaaS experience at Omniful.ai. Strong frontend expertise in React, Next.js, and TypeScript. Built OMS, sales channel, and shipment systems for 100+ enterprise tenants. 30% load-time improvement, real-time systems, and intern-to-team-lead growth.",
  tagline:
    "Software Engineer with strong frontend expertise — shipping scalable SaaS systems in production.",
  primaryCta: {
    label: "View Work",
    href: "#work",
  },
  secondaryCta: {
    label: "Get In Touch",
    href: "#contact",
  },
  navBrand: {
    monogram: "RP",
    tagline: "Software · SaaS",
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
