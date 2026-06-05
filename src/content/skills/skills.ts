export type SkillCapabilityAccent = "indigo" | "emerald" | "zinc" | "amber";

export type SkillCapability = {
  title: string;
  tagline: string;
  skills: string[];
  proof: string;
  proofHref: string;
  accent: SkillCapabilityAccent;
  featured?: boolean;
};

export const skillCapabilities: SkillCapability[] = [
  {
    title: "Application Engineering",
    tagline: "Ship scalable web applications that stay fast as complexity grows.",
    skills: ["React", "Next.js", "TypeScript", "React Query", "Redux Toolkit"],
    proof: "30% load-time reduction across 15+ table-heavy OMS pages at Omniful.",
    proofHref: "#experience",
    accent: "indigo",
    featured: true,
  },
  {
    title: "Real-Time Product Systems",
    tagline: "Build live operational software with secure, multi-tenant behavior.",
    skills: ["Pusher", "Beam", "WebSockets", "CASL (RBAC)", "Sentry"],
    proof: "Real-time order tracking and notifications for 100+ enterprise tenants.",
    proofHref: "#experience",
    accent: "emerald",
  },
  {
    title: "UI & Form Engineering",
    tagline: "Responsive, production-ready interfaces for workflow-heavy products.",
    skills: ["Tailwind CSS", "Bootstrap", "React Hook Form", "Yup", "SCSS"],
    proof: "Production UIs shipped from intern onboarding through team lead at Omniful.",
    proofHref: "#experience",
    accent: "zinc",
  },
  {
    title: "Engineering Tooling & AI Workflow",
    tagline: "Improve team delivery with modern tooling and AI-assisted practices.",
    skills: ["Cursor", "Git", "ESLint", "LLM-Assisted Code Review"],
    proof: "Cursor workflow adopted by the frontend team — ~50% faster feature scaffolding.",
    proofHref: "#experience",
    accent: "amber",
  },
];
