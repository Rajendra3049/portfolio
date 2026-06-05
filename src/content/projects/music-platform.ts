import { projectSchema, type Project } from "@/entities/project";

export const musicPlatformProject: Project = projectSchema.parse({
  title: "Music Platform",
  slug: "music-platform",
  shortDescription:
    "Modern music discovery and playlist experience with scalable UI architecture.",
  longDescription:
    "Music Platform explores performance-conscious UI rendering patterns for media-heavy interfaces while preserving accessibility and interaction clarity.",
  engineeringHighlights: [
    "Built composable card and listing patterns for content-dense layouts.",
    "Introduced lazy loading strategies for large media grids.",
    "Improved user flow discoverability with clear hierarchy and section grouping.",
  ],
  architectureNotes: [
    "Reusable surface system for lists, detail previews, and controls.",
    "Data-oriented grouping to support future recommendation modules.",
    "Progressive rendering strategy to keep first-load interactions responsive.",
  ],
  techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  screenshots: ["/work/music-1.png", "/work/music-2.png"],
  liveUrl: "https://example.com/music-platform",
  githubUrl: "https://github.com/example/music-platform",
  featured: false,
  categories: ["Media", "Frontend Systems"],
  metrics: [
    { label: "UI Modules", value: "10+" },
    { label: "Interactive States", value: "30+" },
  ],
  challenges: [
    "Maintaining smooth interaction performance on media-heavy screens.",
    "Balancing visual density with quick scanability.",
  ],
  outcomes: [
    "Validated reusable architecture for rich listing and detail experiences.",
    "Established a scalable basis for future personalization features.",
  ],
});
