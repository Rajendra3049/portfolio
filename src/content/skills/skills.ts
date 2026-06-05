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
    title: "Frontend Systems",
    tagline: "Ship scalable product UIs that stay fast as complexity grows.",
    skills: ["React", "Next.js", "TypeScript", "React Query", "Redux Toolkit"],
    proof: "30% load-time reduction across 15+ table-heavy OMS pages at Omniful.",
    proofHref: "#experience",
    accent: "indigo",
    featured: true,
  },
  {
    title: "SaaS & Real-Time",
    tagline: "Build live operational systems with secure, multi-tenant product surfaces.",
    skills: ["Pusher", "WebSockets", "CASL (RBAC)", "Sentry", "TanStack Query"],
    proof: "Real-time order tracking and notifications for 100+ enterprise tenants.",
    proofHref: "#experience",
    accent: "emerald",
  },
  {
    title: "Styling & UI",
    tagline: "Polished, responsive interfaces that hold up on real production workflows.",
    skills: ["Tailwind CSS", "Responsive Design", "React Hook Form", "SCSS"],
    proof: "Production UIs shipped from intern onboarding through team lead at Omniful.",
    proofHref: "#experience",
    accent: "zinc",
  },
  {
    title: "Tooling & AI Workflow",
    tagline: "Accelerate delivery with modern tooling and AI-assisted engineering practices.",
    skills: ["Cursor", "Git", "ESLint", "Supabase", "LLM-Assisted Code Review"],
    proof: "Cursor workflow adopted by the frontend team — ~50% faster feature scaffolding.",
    proofHref: "/work/taskorbit",
    accent: "amber",
  },
];
