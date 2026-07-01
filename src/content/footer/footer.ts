export const footerContent = {
  eyebrow: "Footer",
  name: "Rajendra Patel.",
  intro:
    "Frontend Engineer building production SaaS products with React, TypeScript, and modern engineering practices.",
  status: "Open to Opportunities",
  connectLabel: "Let's Connect",
  navLinks: [
    { label: "Projects", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
    { label: "Resume", href: "/resume" },
  ],
  socials: [
    {
      id: "github" as const,
      label: "GitHub",
      href: "https://github.com/Rajendra3049",
    },
    {
      id: "linkedin" as const,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rajendra-patel-308237238/",
    },
    {
      id: "email" as const,
      label: "Email",
      href: "mailto:rajendrapatel0430@gmail.com",
    },
    {
      id: "resume" as const,
      label: "Resume",
      href: "/resume",
    },
  ],
  copyright: "© 2026 Rajendra Patel",
  builtWith: ["React", "TypeScript", "Framer Motion", "Next.js"],
  backToTopLabel: "Back to top",
} as const;
