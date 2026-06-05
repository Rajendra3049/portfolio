import { experienceSchema, type Experience } from "@/entities/experience";

export const omnifulExperience: Experience = experienceSchema.parse({
  role: "Software Engineer",
  company: "Omniful",
  duration: "2023 - Present",
  summary:
    "Owning key frontend platform surfaces and enabling reliable operational workflows for multi-team product usage.",
  impactPoints: [
    "Led implementation of modular frontend architecture for dashboard-scale product areas.",
    "Improved task and workflow responsiveness through optimized rendering and data-loading patterns.",
    "Shipped reusable UI primitives to reduce duplication and increase delivery consistency.",
  ],
  stack: ["React", "Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
  achievements: [
    "Delivered architecture-level improvements for shared product modules.",
    "Collaborated across product and engineering to simplify high-friction workflows.",
    "Increased maintainability by moving repeated UI logic into shared abstractions.",
  ],
  metrics: [
    { label: "Core Modules Owned", value: "4+" },
    { label: "Workflow Improvements", value: "12+" },
  ],
});
