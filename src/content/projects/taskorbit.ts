import { projectSchema, type Project } from "@/entities/project";

export const taskorbitProject: Project = projectSchema.parse({
  title: "TaskOrbit",
  slug: "taskorbit",
  shortDescription:
    "Productivity and task management platform for organizing, prioritizing, and tracking work through an intuitive workflow.",
  longDescription:
    "TaskOrbit is a full-stack productivity application built to help users manage tasks, projects, and deadlines with filtering, status tracking, and responsive workflows designed for daily operational use.",
  engineeringHighlights: [
    "Built task creation, editing, status management, due-date tracking, and filtering for high-frequency productivity flows.",
    "Architected reusable React components and custom hooks to reduce duplication across feature modules.",
    "Implemented secure authentication, protected routes, and REST API integrations for end-to-end user journeys.",
    "Optimized rendering performance on task-heavy screens through memoization and efficient state management.",
  ],
  architectureNotes: [
    "Feature-oriented module boundaries with shared UI primitives and hooks.",
    "Redux Toolkit for predictable state transitions across task and project views.",
    "API-driven data layer with protected route guards and role-aware navigation.",
    "Mobile-first responsive layout system for consistent cross-device usage.",
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
  screenshots: ["/work/taskorbit-1.png", "/work/taskorbit-2.png"],
  liveUrl: "https://task-orbit-web.vercel.app/",
  githubUrl: "https://github.com/Rajendra3049/task-orbit",
  featured: true,
  categories: ["SaaS", "Productivity", "Full Stack"],
  metrics: [
    { label: "Core Task Flows", value: "6+" },
    { label: "Reusable Modules", value: "20+" },
  ],
  challenges: [
    "Keeping task list performance smooth as data volume and filter combinations grew.",
    "Designing state transitions that stay predictable across create, edit, and status-change flows.",
  ],
  outcomes: [
    "Delivered a production-ready task management product with live deployment and GitHub source.",
    "Established reusable frontend patterns that simplified adding new productivity features.",
  ],
});
