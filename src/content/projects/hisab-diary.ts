import { projectSchema, type Project } from "@/entities/project";

export const hisabDiaryProject: Project = projectSchema.parse({
  title: "Hisab Diary",
  slug: "hisab-diary",
  shortDescription:
    "Personal finance and expense management platform with categorization, analytics, and reporting dashboards.",
  longDescription:
    "Hisab Diary is a full-stack expense management application for tracking spending, organizing categories, and reviewing financial patterns through a clean, mobile-friendly operational interface.",
  engineeringHighlights: [
    "Built a full-stack expense platform with React, TypeScript, Node.js, and MongoDB.",
    "Developed reusable components and Redux Toolkit architecture for scalable state management.",
    "Implemented expense categorization, financial analytics, and reporting dashboards.",
    "Integrated secure authentication, authorization, and protected routes.",
  ],
  architectureNotes: [
    "Redux Toolkit store design for predictable expense and category state.",
    "REST API consumption layer with optimized rendering for list-heavy views.",
    "Auth-gated routes and role-safe access patterns for user-specific financial data.",
    "Responsive, mobile-first UI for fast entry and review workflows.",
  ],
  techStack: [
    "React",
    "TypeScript",
    "Redux Toolkit",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "MongoDB",
  ],
  screenshots: ["/work/hisab-1.png", "/work/hisab-2.png"],
  liveUrl: "https://expense-manager-smoky.vercel.app/",
  githubUrl: "https://github.com/Rajendra3049/hisab-diary",
  featured: true,
  categories: ["FinTech", "SaaS", "Full Stack"],
  metrics: [
    { label: "Core Journeys", value: "5+" },
    { label: "Analytics Views", value: "3+" },
  ],
  challenges: [
    "Balancing fast expense entry with accurate categorization and validation rules.",
    "Keeping analytics views responsive while aggregating growing transaction history.",
  ],
  outcomes: [
    "Shipped a live expense management product with authentication and reporting capabilities.",
    "Created a maintainable full-stack foundation for future budgeting and insights features.",
  ],
});
