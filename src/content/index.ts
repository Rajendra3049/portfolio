import { type Experience } from "@/entities/experience";
import { type Project } from "@/entities/project";
import { omnifulExperience } from "@/content/experience/omniful";
import { hisabDiaryProject } from "@/content/projects/hisab-diary";
import { musicPlatformProject } from "@/content/projects/music-platform";
import { taskorbitProject } from "@/content/projects/taskorbit";

export const projects: Project[] = [
  taskorbitProject,
  hisabDiaryProject,
  musicPlatformProject,
];

export const experiences: Experience[] = [omnifulExperience];

export const getFeaturedProjects = () =>
  projects.filter((project) => project.featured);

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
