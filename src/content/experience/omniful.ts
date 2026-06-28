import { experienceSchema, type Experience } from "@/entities/experience";

export const omnifulExperience: Experience = experienceSchema.parse({
  role: "Associate Team Lead",
  company: "Omniful.ai",
  duration: "Sep 2023 – Present · Gurugram, India",
  summary:
    "Supply chain and logistics SaaS — joined as an intern, grew into full-time engineering, and now lead frontend delivery across OMS, sales channels, and shipment systems used by 100+ enterprise tenants processing 52K+ orders per day.",
  positions: [
    {
      role: "Associate Team Lead",
      duration: "Jul 2025 – Present",
      headline:
        "Leading frontend delivery across OMS, sales channels, and shipment for 100+ enterprise tenants.",
      scope: "Leadership & delivery",
      tools: ["Delivery", "Mentorship", "Architecture", "Code Review"],
      isPromotion: false,
      isCurrent: true,
      impactPoints: [
        "Lead frontend delivery across OMS, sales channel, and shipment modules for 100+ enterprise tenants processing 52K+ orders daily.",
        "Drive sprint planning, system design reviews, and code reviews with product, backend, and QA to keep release cadence predictable.",
        "Mentor junior engineers through knowledge sharing and engineering standards, growing team output and code quality.",
        "Introduced an AI-assisted Cursor workflow adopted by the frontend team, cutting feature scaffolding time by ~50%.",
      ],
    },
    {
      role: "Software Engineer",
      duration: "Mar 2024 – Jun 2025",
      headline: "Built OMS and real-time order systems — 30% faster loads across 15+ table-heavy pages.",
      summary:
        "Full-time engineer owning OMS, sales channel integrations, and shipment workflows for 100+ enterprise tenants — focused on performance, real-time visibility, and reusable frontend patterns across high-traffic logistics surfaces.",
      scope: "OMS & real-time systems",
      tools: ["React Query", "Pusher", "CASL", "Redux"],
      collapsedSummary: "30% load cut · OMS & real-time systems for 100+ tenants",
      impactPoints: [
        "Engineered OMS, sales channel, and shipment systems for 100+ tenants — cut page load times 30% with React Query caching, code splitting, and memoized list rendering across 15+ pages.",
        "Reduced code duplication by 40% through reusable components, custom hooks, and centralized utilities shared across logistics modules.",
        "Built a centralized multi-platform dashboard (Shopify, Amazon) and real-time order tracking via Pusher, improving operational visibility for tenant ops teams.",
        "Automated shipment creation from a multi-screen manual flow to under 10 seconds, and implemented CASL-based RBAC for safe multi-role tenant UI.",
      ],
    },
    {
      role: "Software Engineer Intern",
      duration: "Sep 2023 – Feb 2024",
      headline: "Shipped production React UI in a fast-moving logistics SaaS team.",
      summary:
        "Joined as an intern on the frontend team, shipping production React features while learning the logistics SaaS codebase and contributing to tenant-facing order and inventory workflows.",
      scope: "Internship · foundational product UI",
      tools: ["React", "Redux", "React Hook Form"],
      collapsedSummary: "Shipped production React UI in a fast-moving logistics SaaS team",
      isCompact: true,
      impactPoints: [
        "Shipped production React features in a fast-moving logistics SaaS environment, contributing to tenant-facing workflows from day one.",
        "Built responsive UIs, reusable components, and form flows with React Hook Form and Redux Toolkit.",
        "Improved UI performance and upheld clean code, Git, and Agile practices across the frontend codebase.",
      ],
    },
  ],
  stack: [
    "React.js",
    "Next.js",
    "TypeScript",
    "React Query",
    "Redux Toolkit",
    "React Hook Form",
    "Bootstrap",
    "JavaScript",
    "SCSS",
    "Pusher",
    "Beam",
    "CASL",
    "Sentry",
    "i18next",
    "Axios",
  ],
  achievements: [
    "Grew from Software Engineer Intern to Associate Team Lead within two years.",
    "Owned frontend for OMS, sales channel, and shipment modules used by 100+ enterprise tenants processing 52K+ orders per day.",
    "Cut page load time by 30% and code duplication by 40% across production logistics SaaS surfaces.",
    "Built an AI-assisted Cursor workflow adopted by the frontend team, cutting feature scaffolding time by ~50%.",
  ],
  metrics: [
    { label: "Tenure", value: "3+ yrs" },
    { label: "Load Time", value: "30% faster" },
    { label: "Duplication", value: "40% less" },
  ],
});
