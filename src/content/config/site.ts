import { siteConfigSchema, type SiteConfig } from "@/entities/site";

export const siteConfig: SiteConfig = siteConfigSchema.parse({
  name: "Rajendra Patel",
  domain: "rajendrapatel.dev",
  title: "Rajendra Patel | Frontend Engineer · SaaS & Real-Time Systems",
  description:
    "Frontend engineer with ~3 years of experience building scalable SaaS applications for logistics and e-commerce. Specialized in React.js, Next.js, TypeScript, and real-time systems at Omniful.",
  tagline:
    "Building scalable SaaS applications and real-time frontend systems for high-volume operations.",
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
    { label: "Contact", href: "#contact" },
    { label: "Resume", href: "/resume" },
  ],
  socialLinks: [
    { label: "GitHub", href: "https://github.com/Rajendra3049" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rajendra-patel-308237238/",
    },
    { label: "Email", href: "mailto:rajendrapatel0430@gmail.com" },
  ],
});
