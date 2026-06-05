import { projectSchema, type Project } from "@/entities/project";

export const hisabDiaryProject: Project = projectSchema.parse({
  title: "Hisab Diary",
  slug: "hisab-diary",
  shortDescription:
    "Lightweight ledger and financial tracking app with a clean operational UX.",
  longDescription:
    "Hisab Diary is a focused system for managing entries, balances, and financial workflows with emphasis on fast interaction and reliable data representation.",
  engineeringHighlights: [
    "Implemented structured data models for repeatable ledger interactions.",
    "Built clear input and display flows to reduce transactional errors.",
    "Optimized component composition for mobile-friendly usage.",
  ],
  architectureNotes: [
    "Schema-led content and state modeling to support future feature extension.",
    "Separation of display components from business logic for maintainability.",
    "Reusable list and form abstractions to avoid duplicated rendering patterns.",
  ],
  techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Zod", "React Hook Form"],
  screenshots: ["/work/hisab-1.png", "/work/hisab-2.png"],
  liveUrl: "https://example.com/hisab-diary",
  githubUrl: "https://github.com/example/hisab-diary",
  featured: true,
  categories: ["FinTech", "SaaS", "Product UX"],
  metrics: [
    { label: "Core Journeys", value: "5+" },
    { label: "Validation Rules", value: "20+" },
  ],
  challenges: [
    "Ensuring accurate entry handling while keeping interaction latency low.",
    "Designing forms that remain clear across small-screen devices.",
  ],
  outcomes: [
    "Delivered an operationally simple experience for recurring financial tasks.",
    "Created a maintainable architecture for future category and reporting extensions.",
  ],
});
