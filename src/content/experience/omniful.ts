import { experienceSchema, type Experience } from "@/entities/experience";

export const omnifulExperience: Experience = experienceSchema.parse({
  role: "Associate Team Lead · Software Development Engineer",
  company: "Omniful.ai",
  duration: "Sep 2023 – Present",
  summary:
    "Leading frontend delivery for order management, sales channels, and shipment creation modules used by 100+ enterprise tenants processing 52K+ orders per day.",
  impactPoints: [
    "Cut page load time by 30% through React Query caching, route-level code splitting, and memoized rendering across 15+ table-heavy pages.",
    "Reduced code duplication by 40% via reusable components, custom hooks, and shared utilities.",
    "Migrated shipment creation from a multi-screen manual flow to an automated pipeline, reducing processing time from minutes to under 10 seconds.",
    "Built a centralized sales-channel dashboard unifying Shopify, Amazon, and other platforms for multi-channel order and inventory management.",
    "Implemented real-time order tracking with Pusher and notification alerts with Beam for instant user feedback.",
    "Introduced route- and action-level RBAC with CASL ability mappings for safe multi-role tenant UI behavior.",
    "Led feature planning, code reviews, and mentoring while collaborating across product, backend, and QA teams.",
  ],
  stack: [
    "React",
    "Next.js",
    "TypeScript",
    "React Query",
    "Redux Toolkit",
    "CASL",
    "Pusher",
    "Tailwind CSS",
  ],
  achievements: [
    "Owned core OMS, sales channel, and shipment modules in a high-scale logistics SaaS platform.",
    "Built an AI-assisted Cursor workflow (Skills, context files, PR-review agent) adopted by the frontend team, cutting feature scaffolding time by ~50%.",
    "Conducted system design and code reviews to improve scalability, performance, and clean coding practices.",
  ],
  metrics: [
    { label: "Enterprise Tenants", value: "100+" },
    { label: "Daily Order Volume", value: "52K+" },
    { label: "Load Time Reduction", value: "30%" },
  ],
});
