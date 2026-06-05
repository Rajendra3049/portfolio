import { projectSchema, type Project } from "@/entities/project";

export const taskorbitProject: Project = projectSchema.parse({
  title: "TaskOrbit",
  slug: "taskorbit",
  shortDescription:
    "AI-first productivity platform for planning, execution, and operating workflows.",
  longDescription:
    "TaskOrbit is a productivity operating system focused on helping teams and individuals manage tasks, projects, and recurring workflows in one coherent product surface.",
  engineeringHighlights: [
    "Designed feature-oriented module boundaries for long-term maintainability.",
    "Implemented reusable task views and filters with predictable state transitions.",
    "Built consistent dashboard patterns for high-frequency productivity workflows.",
  ],
  architectureNotes: [
    "Data-first design where domain types and schemas drive component behavior.",
    "Composable sections and cards to reduce coupling between product modules.",
    "Incremental scalability through feature folders and shared primitives.",
  ],
  techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Framer Motion"],
  screenshots: ["/work/taskorbit-1.png", "/work/taskorbit-2.png"],
  liveUrl: "https://example.com/taskorbit",
  githubUrl: "https://github.com/example/taskorbit",
  featured: true,
  categories: ["SaaS", "Productivity", "Frontend Architecture"],
  metrics: [
    { label: "Core Views", value: "8+" },
    { label: "Reusable Components", value: "25+" },
  ],
  challenges: [
    "Balancing flexibility across multiple workflow views without duplicated logic.",
    "Keeping state orchestration predictable while scaling feature complexity.",
  ],
  outcomes: [
    "Established a reusable architecture foundation for future product modules.",
    "Improved UX consistency by standardizing interaction patterns across sections.",
  ],
});
