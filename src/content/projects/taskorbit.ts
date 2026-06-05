import { projectSchema, type Project } from "@/entities/project";

export const taskorbitProject: Project = projectSchema.parse({
  title: "TaskOrbit",
  slug: "taskorbit",
  shortDescription:
    "Productivity and task management platform for organizing, prioritizing, and tracking work.",
  heroTagline:
    "Built a live task management product with auth, filtering, and scalable architecture — shipped solo from UI through deployment.",
  longDescription:
    "TaskOrbit is a task management application for organizing, prioritizing, and tracking work through creation, editing, status management, due-date tracking, and filtering workflows.",
  problem:
    "Users need a structured way to manage tasks, statuses, due dates, and filters without losing speed during daily use.",
  originStory:
    "During busy development weeks at Omniful, I kept juggling deadlines across multiple tools. I wanted a single workspace that could handle prioritization, status tracking, and routines — so I built TaskOrbit as a productivity system I would actually use every day.",
  role: "Solo builder — product, frontend, backend, and deployment",
  timeline: "2024 – 2025 · ongoing product build",
  caseStudy: {
    myRole: [
      "Owned end-to-end product design, UI implementation, API integrations, authentication, and production deployment.",
      "Architected reusable components and custom hooks to reduce duplication and simplify feature development.",
      "Built task creation, editing, status management, due-date tracking, and filtering workflows.",
    ],
    challenge: [
      "Keeping task-heavy screens responsive as data volume and filter combinations grew.",
      "Designing state transitions that stay predictable across create, edit, and status-change flows.",
      "Balancing a simple daily workflow with enough structure for planning and routines.",
    ],
    approach: [
      "Built a feature-oriented frontend with shared UI primitives and hooks to avoid duplication across modules.",
      "Used TanStack Query for server-state caching and Zustand for lightweight client workflow state.",
      "Deployed on Next.js + Supabase with PostgreSQL for reliable, scalable data persistence.",
      "Designed mobile-first layouts so task entry and review stay fast on any device.",
    ],
    outcomes: [
      "Live production deployment with authenticated user journeys and core task management flows.",
      "Reusable frontend patterns that made adding new productivity features significantly faster.",
      "Open-source repository documenting architecture decisions for recruiters and collaborators.",
    ],
    differentiator: [
      "Full product ownership beyond employer work — authentication, APIs, performance, and responsive UI.",
      "Solo-shipped SaaS with live URL and GitHub source, not a tutorial todo app.",
      "Modern stack (Next.js, TypeScript, Supabase, TanStack Query) aligned with current product engineering standards.",
    ],
  },
  techStack: [
    "Next.js",
    "TypeScript",
    "Supabase",
    "PostgreSQL",
    "Zustand",
    "TanStack Query",
    "Tailwind CSS",
  ],
  coverImage: "/work/taskorbit-cover.png",
  screenshots: [
    {
      src: "/work/taskorbit-1.png",
      caption: "Task dashboard with filtering, status tracking, and prioritized workflows.",
      alt: "TaskOrbit dashboard showing task list and filters",
    },
    {
      src: "/work/taskorbit-2.png",
      caption: "Task creation and editing flow designed for high-frequency daily use.",
      alt: "TaskOrbit task creation form",
    },
  ],
  liveUrl: "https://task-orbit-web.vercel.app/",
  githubUrl: "https://github.com/Rajendra3049/task-orbit",
  featured: true,
  categories: ["SaaS", "Productivity", "Full Stack"],
  metrics: [
    { label: "Status", value: "Live" },
    { label: "Build", value: "Solo" },
    { label: "Stack", value: "Next.js + Supabase" },
  ],
});
