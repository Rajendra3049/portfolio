import { projectSchema, type Project } from "@/entities/project";

export const taskorbitProject: Project = projectSchema.parse({
  title: "TaskOrbit",
  slug: "taskorbit",
  shortDescription:
    "Personal productivity operating system for tasks, routines, planning, and work-life organization.",
  heroTagline:
    "Turned scattered daily work into one prioritized workspace — shipped live with auth, filtering, and scalable SaaS architecture.",
  longDescription:
    "TaskOrbit is a personal productivity OS that helps users manage tasks, routines, planning, and work-life organization through a modern, scalable workspace — not another static todo list.",
  problem:
    "Knowledge workers lose time switching between notes, chats, and ad-hoc lists. Most task apps are either too lightweight (no structure) or too heavy (enterprise overhead) for daily personal productivity.",
  originStory:
    "During busy development weeks at Omniful, I kept juggling deadlines across multiple tools. I wanted a single workspace that could handle prioritization, status tracking, and routines without the friction of enterprise software — so I designed TaskOrbit as a productivity system I would actually use every day.",
  role: "Solo builder — product, frontend, backend, and deployment",
  timeline: "2024 – 2025 · ongoing product build",
  caseStudy: {
    myRole: [
      "Owned end-to-end product design, UI implementation, API integrations, authentication, and production deployment.",
      "Architected feature modules with reusable components, custom hooks, and predictable state management.",
      "Iterated on workflow UX for task creation, editing, filtering, due dates, and status transitions.",
    ],
    challenge: [
      "Keeping task-heavy screens responsive as data volume and filter combinations grew.",
      "Designing state transitions that stay predictable across create, edit, and status-change flows.",
      "Balancing a simple daily workflow with enough structure for planning and routines.",
    ],
    approach: [
      "Built a feature-oriented frontend with shared UI primitives and hooks to avoid duplication across modules.",
      "Used TanStack Query for server-state caching and Zustand for lightweight client workflow state.",
      "Deployed on a modern Next.js + Supabase stack with PostgreSQL for reliable, scalable data persistence.",
      "Designed mobile-first layouts so task entry and review stay fast on any device.",
    ],
    outcomes: [
      "Live production deployment with authenticated user journeys and core task management flows.",
      "Reusable frontend patterns that made adding new productivity features significantly faster.",
      "Open-source repository documenting architecture decisions for recruiters and collaborators.",
    ],
    differentiator: [
      "Positioned as a productivity operating system — routines, planning, and organization — not a tutorial todo app.",
      "Full-stack SaaS shipped solo with live URL and GitHub source, demonstrating ownership beyond UI exercises.",
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
    { label: "Core Task Flows", value: "6+" },
    { label: "Reusable Modules", value: "20+" },
    { label: "Stack", value: "Next.js + Supabase" },
  ],
});
