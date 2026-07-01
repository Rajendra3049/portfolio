export type ContactAccent = "emerald" | "indigo" | "amber" | "zinc";

export type ContactActionId = "email" | "linkedin" | "resume" | "github";

export type ContactAction = {
  id: ContactActionId;
  title: string;
  description: string;
  href: string;
  accent: ContactAccent;
  displayValue?: string;
  copyValue?: string;
};

export const contactContent = {
  eyebrow: "Contact",
  headlineLines: ["Have a product worth", "building well?"],
  subtitle:
    "I'm a frontend engineer who cares about production quality, team delivery, and software people actually use. Happy to talk roles, products, or hard UI problems.",
  availability: {
    status: "Available for the right role",
    joiner: "Can join immediately",
    responseTime: "Usually replies within 24 hours",
  },
  actions: [
    {
      id: "email",
      title: "Email",
      description: "Best for direct notes, referrals, or role details.",
      href: "mailto:rajendrapatel0430@gmail.com",
      displayValue: "rajendrapatel0430@gmail.com",
      copyValue: "rajendrapatel0430@gmail.com",
      accent: "emerald",
    },
    {
      id: "linkedin",
      title: "LinkedIn",
      description: "Recruiters and hiring managers — message me here.",
      href: "https://www.linkedin.com/in/rajendra-patel-308237238/",
      displayValue: "linkedin.com/in/rajendra-patel-308237238",
      copyValue: "https://www.linkedin.com/in/rajendra-patel-308237238/",
      accent: "indigo",
    },
    {
      id: "resume",
      title: "Resume",
      description: "One-page summary of experience and impact.",
      href: "/resume",
      accent: "amber",
    },
    {
      id: "github",
      title: "GitHub",
      description: "Code, side projects, and how I build.",
      href: "https://github.com/Rajendra3049",
      displayValue: "github.com/Rajendra3049",
      copyValue: "https://github.com/Rajendra3049",
      accent: "zinc",
    },
  ],
  finalCta: {
    label: "Say hello",
    href: "mailto:rajendrapatel0430@gmail.com",
    subtext: "Tell me what you're building and where frontend ownership matters.",
  },
} as const;
