import { type Experience } from "@/entities/experience";
import { type Project } from "@/entities/project";
import { omnifulExperience } from "@/content/experience/omniful";
import { hisabDiaryProject } from "@/content/projects/hisab-diary";
import { lintProject } from "@/content/projects/lint";
import { taskorbitProject } from "@/content/projects/taskorbit";
import { wingShooterProject } from "@/content/projects/wingshooter";

export const projects: Project[] = [
  taskorbitProject,
  hisabDiaryProject,
  lintProject,
  wingShooterProject,
];

export const experiences: Experience[] = [omnifulExperience];

export const getFeaturedProjects = () =>
  projects.filter((project) => project.featured);

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
