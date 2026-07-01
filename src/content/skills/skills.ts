export type SkillCapabilityAccent = "indigo" | "emerald" | "zinc" | "amber";

export type SkillCapability = {
  title: string;
  groupLabel: string;
  tagline: string;
  skills: string[];
  proof: string;
  proofHref: string;
  accent: SkillCapabilityAccent;
};

export const skillCapabilities: SkillCapability[] = [
  {
    title: "Application Engineering",
    groupLabel: "Frontend",
    tagline: "Scalable web apps that stay fast as complexity grows.",
    skills: ["React", "Next.js", "TypeScript", "React Query", "Redux Toolkit", "Node.js"],
    proof: "30% load-time reduction across 15+ table-heavy OMS pages.",
    proofHref: "#experience",
    accent: "indigo",
  },
  {
    title: "Real-Time Product Systems",
    groupLabel: "Real-time",
    tagline: "Live operational software with secure multi-tenant behavior.",
    skills: ["Pusher", "Beam", "WebSockets", "CASL (RBAC)", "Sentry"],
    proof: "Real-time order tracking for 100+ enterprise tenants.",
    proofHref: "#experience",
    accent: "emerald",
  },
  {
    title: "UI & Form Engineering",
    groupLabel: "UI",
    tagline: "Production-ready interfaces for workflow-heavy products.",
    skills: ["Tailwind CSS", "Bootstrap", "React Hook Form", "Yup", "SCSS"],
    proof: "Production UIs shipped from intern through team lead.",
    proofHref: "#experience",
    accent: "zinc",
  },
  {
    title: "Engineering Tooling & AI Workflow",
    groupLabel: "Tooling",
    tagline: "Modern tooling and AI-assisted delivery practices.",
    skills: ["Cursor", "Git", "ESLint", "PostgreSQL", "Supabase", "LLM-Assisted Code Review"],
    proof: "Cursor workflow adopted by the frontend team — ~50% faster scaffolding.",
    proofHref: "#experience",
    accent: "amber",
  },
];
