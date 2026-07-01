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
  headlineLines: ["Let's build software", "that users remember."],
  subtitle:
    "Frontend engineer who ships production SaaS — open to meaningful conversations.",
  availability: {
    status: "Open to Opportunities",
    joiner: "Immediate Joiner",
    responseTime: "Usually replies within 24 hours",
  },
  actions: [
    {
      id: "email",
      title: "Email",
      description: "Direct outreach for roles and collaborations.",
      href: "mailto:rajendrapatel0430@gmail.com",
      displayValue: "rajendrapatel0430@gmail.com",
      copyValue: "rajendrapatel0430@gmail.com",
      accent: "emerald",
    },
    {
      id: "linkedin",
      title: "LinkedIn",
      description: "Best for recruiters and hiring teams.",
      href: "https://www.linkedin.com/in/rajendra-patel-308237238/",
      displayValue: "linkedin.com/in/rajendra-patel-308237238",
      copyValue: "https://www.linkedin.com/in/rajendra-patel-308237238/",
      accent: "indigo",
    },
    {
      id: "resume",
      title: "Resume",
      description: "Experience, impact, and production work.",
      href: "/resume",
      accent: "amber",
    },
    {
      id: "github",
      title: "GitHub",
      description: "Code, side projects, and engineering craft.",
      href: "https://github.com/Rajendra3049",
      displayValue: "github.com/Rajendra3049",
      copyValue: "https://github.com/Rajendra3049",
      accent: "zinc",
    },
  ],
  finalCta: {
    label: "Start a conversation",
    href: "mailto:rajendrapatel0430@gmail.com",
    subtext: "I'd love to hear about the product you're building.",
  },
} as const;
