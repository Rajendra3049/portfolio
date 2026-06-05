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
      scope: "Leadership & delivery",
      isPromotion: true,
      isCurrent: true,
      impactPoints: [
        "Lead frontend delivery across OMS, sales channel, and shipment modules.",
        "Oversee feature planning, sprint delivery, system design reviews, and code reviews with product, backend, and QA.",
        "Mentor junior engineers and foster team growth through knowledge sharing and engineering best practices.",
      ],
    },
    {
      role: "Software Engineer",
      duration: "Mar 2024 – Jun 2025",
      scope: "OMS & real-time systems",
      collapsedSummary: "30% load cut · OMS & real-time systems for 100+ tenants",
      impactPoints: [
        "Engineered Order Management, Sales Channel Services, and Shipment Creation systems for 100+ enterprise tenants.",
        "Cut page load times by 30% with React Query caching, route-level code splitting, and memoized list rendering across 15+ table-heavy pages.",
        "Reduced code duplication by 40% through reusable components, custom hooks, and centralized utilities.",
        "Built a centralized sales-channel dashboard unifying Shopify, Amazon, and other platforms for multi-platform order and inventory management.",
        "Implemented real-time order tracking via Pusher and a real-time notification system using Beam.",
        "Migrated shipment creation from a multi-screen manual flow to an automated pipeline, reducing per-shipment processing time from minutes to under 10 seconds.",
        "Implemented route- and action-level RBAC with CASL ability mappings for safe multi-role tenant UI behavior.",
      ],
    },
    {
      role: "Software Engineer Intern",
      duration: "Sep 2023 – Feb 2024",
      scope: "Internship · foundational product UI",
      collapsedSummary: "Shipped production React UI in a fast-moving logistics SaaS team",
      isCompact: true,
      impactPoints: [
        "Shipped production React features in a fast-moving logistics SaaS environment.",
        "Built responsive UIs, reusable components, and form flows with React Hook Form and Redux Toolkit.",
        "Improved UI performance and contributed to clean code, Git, and Agile practices.",
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
    { label: "Tenure", value: "2+ yrs" },
    { label: "Load Time", value: "30% faster" },
    { label: "Duplication", value: "40% less" },
  ],
});
