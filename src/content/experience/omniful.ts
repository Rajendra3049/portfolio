import { experienceSchema, type Experience } from "@/entities/experience";

export const omnifulExperience: Experience = experienceSchema.parse({
  role: "Associate Team Lead",
  company: "Omniful.ai",
  duration: "Sep 2023 – Present · Gurugram, India",
  summary:
    "Supply chain and logistics SaaS replacing legacy systems for retailers and 3PLs. I joined as an intern and now lead frontend on OMS, sales channels, and shipment — modules used by 100+ enterprise tenants processing 52K+ orders per day.",
  positions: [
    {
      role: "Associate Team Lead",
      duration: "Jul 2025 – Present",
      headline:
        "Leading frontend delivery on OMS, sales channels, and shipment for 100+ tenants.",
      summary:
        "Promoted after two years of shipping core product surfaces — now setting frontend standards, running reviews, and growing the team on a high-volume logistics platform.",
      scope: "Leadership & delivery",
      tools: ["Delivery", "Mentorship", "Architecture", "Code Review"],
      isPromotion: false,
      isCurrent: true,
      impactPoints: [
        "Run sprint planning, design reviews, and code reviews with product, backend, and QA to keep releases predictable.",
        "Mentor junior engineers on standards and delivery — improving team output and code quality.",
        "Introduced a Cursor-assisted workflow adopted by the frontend team, cutting feature scaffolding time by ~50%.",
        "Set architecture direction for frontend modules serving 100+ tenants and 52K+ daily orders.",
      ],
      metrics: [
        { label: "Tenants", value: "100+" },
        { label: "Orders / day", value: "52K+" },
        { label: "Scaffolding", value: "~50% faster" },
      ],
    },
    {
      role: "Software Engineer",
      duration: "Mar 2024 – Jun 2025",
      headline: "Owned OMS and real-time order systems — 30% faster on 15+ table-heavy pages.",
      summary:
        "Full-time engineer on the core product team — high-traffic table-heavy surfaces, multi-tenant RBAC, and real-time order operations.",
      scope: "OMS & real-time systems",
      tools: ["React Query", "Pusher", "CASL", "Redux"],
      collapsedSummary: "30% load cut · OMS & real-time systems for 100+ tenants",
      impactPoints: [
        "Cut page load time 30% with React Query caching, code splitting, and memoized lists across 15+ operational pages.",
        "Reduced duplication 40% through shared components, hooks, and utilities.",
        "Built a centralized sales channel dashboard (Shopify, Amazon) with real-time order tracking via Pusher.",
        "Compressed shipment creation from a multi-screen manual flow to under 10 seconds with CASL-based RBAC.",
      ],
      metrics: [
        { label: "Load Time", value: "30% faster" },
        { label: "Duplication", value: "40% less" },
        { label: "Pages", value: "15+ optimized" },
      ],
    },
    {
      role: "Software Engineer Intern",
      duration: "Sep 2023 – Feb 2024",
      headline: "First production commits on tenant-facing order and inventory workflows.",
      summary:
        "First role on the frontend team — focused on tenant-facing order and inventory workflows in a live logistics platform.",
      scope: "Internship · foundational product UI",
      tools: ["React", "Redux", "React Hook Form"],
      collapsedSummary: "Shipped production React UI in a fast-moving logistics SaaS team",
      isCompact: true,
      impactPoints: [
        "Shipped responsive UIs, reusable components, and form flows with React Hook Form and Redux Toolkit.",
        "Contributed to live order and inventory workflows from day one in an Agile product team.",
        "Improved UI performance and upheld code review, Git, and delivery practices on the frontend codebase.",
      ],
      metrics: [
        { label: "Focus", value: "Production UI" },
        { label: "Workflows", value: "Order & inventory" },
        { label: "Duration", value: "6 months" },
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
    { label: "Tenure", value: "2.5+ yrs" },
    { label: "Load Time", value: "30% faster" },
    { label: "Duplication", value: "40% less" },
  ],
});
