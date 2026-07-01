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
    title: "Application & Performance Engineering",
    groupLabel: "Frontend",
    tagline: "Keep complex SaaS UIs fast as data volume and tenant count grow.",
    skills: ["React", "Next.js", "TypeScript", "React Query", "Redux Toolkit"],
    proof: "30% faster loads across 15+ OMS pages via React Query, code splitting, and memoized rendering.",
    proofHref: "#experience",
    accent: "indigo",
  },
  {
    title: "Real-Time & Multi-Tenant Systems",
    groupLabel: "Real-time",
    tagline: "Live operational software where permissions and updates must be correct per tenant.",
    skills: ["Pusher", "WebSockets", "CASL", "Sentry", "i18next"],
    proof: "Real-time order tracking and CASL-based RBAC for 100+ enterprise tenants.",
    proofHref: "#experience",
    accent: "emerald",
  },
  {
    title: "UI & Workflow Engineering",
    groupLabel: "UI",
    tagline: "Interfaces for long, form-heavy workflows — not marketing pages.",
    skills: ["React Hook Form", "Tailwind CSS", "Bootstrap", "SCSS", "Yup"],
    proof: "Production UIs shipped from intern through team lead on tenant-facing workflows.",
    proofHref: "#experience",
    accent: "zinc",
  },
  {
    title: "Architecture & Delivery",
    groupLabel: "Delivery",
    tagline: "Reusable frontend systems that speed up the team, not just one feature.",
    skills: ["Component architecture", "Code review", "Cursor", "Git", "ESLint"],
    proof: "40% less duplication via shared components and hooks; Cursor workflow adopted by the frontend team (~50% faster scaffolding).",
    proofHref: "#experience",
    accent: "amber",
  },
];
