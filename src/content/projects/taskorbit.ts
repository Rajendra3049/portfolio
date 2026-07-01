import { projectSchema, type Project } from "@/entities/project";

export const taskorbitProject: Project = projectSchema.parse({
  title: "TaskOrbit",
  slug: "taskorbit",
  shortDescription:
    "Personal productivity platform for tasks, routines, and planning — built and maintained solo.",
  heroTagline:
    "A live productivity system I use to manage tasks, planning, and workflows — shipped solo from auth to deployment.",
  longDescription:
    "TaskOrbit is a productivity application for organizing tasks, tracking status and due dates, and managing daily workflows through a single workspace.",
  problem:
    "Scattered tools break focus. I needed one workspace for tasks, status, due dates, and planning without slowing down daily use.",
  originStory:
    "During busy weeks at Omniful, I was juggling deadlines across multiple tools. I built TaskOrbit as the system I would actually open every day.",
  role: "Solo builder — product, frontend, backend, deployment",
  timeline: "2024 – present",
  caseStudy: {
    myRole: [
      "Owned end-to-end product design, UI implementation, API integrations, authentication, and production deployment.",
      "Architected reusable components and custom hooks to reduce duplication and simplify feature development.",
      "Built task creation, editing, status management, due-date tracking, and filtering workflows.",
    ],
    challenge: [
      "Keeping task-heavy screens responsive as filters and data volume grew.",
      "Designing predictable state across create, edit, and status-change flows.",
      "Balancing a simple daily workflow with enough structure for planning.",
    ],
    approach: [
      "Built a feature-oriented frontend with shared UI primitives and hooks to avoid duplication across modules.",
      "Used TanStack Query for server-state caching and Zustand for lightweight client workflow state.",
      "Deployed on Next.js + Supabase with PostgreSQL for auth and reliable data persistence.",
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
  coverImage: "/work/taskorbit-cover.webp",
  screenshots: [
    {
      src: "/work/taskorbit-1.webp",
      caption: "Sign-in flow with email authentication and route protection.",
      alt: "TaskOrbit sign-in screen with email and password fields",
    },
    {
      src: "/work/taskorbit-2.webp",
      caption: "Settings workspace for mode behavior, notifications, and integrations.",
      alt: "TaskOrbit settings page with personal and office mode toggle",
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
