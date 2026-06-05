import { siteConfigSchema, type SiteConfig } from "@/entities/site";

export const siteConfig: SiteConfig = siteConfigSchema.parse({
  name: "Rajendra Patel",
  domain: "rajendrapatel.dev",
  title: "Rajendra Patel | Product-Focused Software Engineer",
  description:
    "Product-focused software engineer building scalable SaaS applications, real-time systems, and modern frontend architecture with React, Next.js, and TypeScript.",
  tagline:
    "Building scalable SaaS systems and production-grade frontend architecture.",
  primaryCta: {
    label: "View Work",
    href: "#work",
  },
  secondaryCta: {
    label: "Get In Touch",
    href: "#contact",
  },
  navItems: [
    { label: "Experience", href: "#experience" },
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "#contact" },
  ],
  socialLinks: [
    { label: "GitHub", href: "https://github.com/rajendrapatel" },
    { label: "LinkedIn", href: "https://linkedin.com/in/rajendrapatel" },
    { label: "Email", href: "mailto:rajendra@example.com" },
  ],
});
