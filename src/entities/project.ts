import { z } from "zod";

export const projectMetricSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

export const projectScreenshotSchema = z.object({
  src: z.string().min(1),
  caption: z.string().min(1),
  alt: z.string().min(1),
});

export const projectCaseStudySchema = z.object({
  myRole: z.array(z.string().min(1)).min(1),
  challenge: z.array(z.string().min(1)).min(1),
  approach: z.array(z.string().min(1)).min(1),
  outcomes: z.array(z.string().min(1)).min(1),
  differentiator: z.array(z.string().min(1)).min(1),
});

export const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  shortDescription: z.string().min(1),
  heroTagline: z.string().min(1),
  longDescription: z.string().min(1),
  problem: z.string().min(1),
  originStory: z.string().min(1),
  role: z.string().min(1),
  timeline: z.string().min(1),
  caseStudy: projectCaseStudySchema,
  techStack: z.array(z.string().min(1)).min(1),
  coverImage: z.string().min(1),
  screenshots: z.array(projectScreenshotSchema).min(1),
  liveUrl: z.string().url(),
  githubUrl: z.string().url(),
  featured: z.boolean(),
  categories: z.array(z.string().min(1)).min(1),
  metrics: z.array(projectMetricSchema).min(1),
});

export type ProjectMetric = z.infer<typeof projectMetricSchema>;
export type ProjectScreenshot = z.infer<typeof projectScreenshotSchema>;
export type ProjectCaseStudy = z.infer<typeof projectCaseStudySchema>;
export type Project = z.infer<typeof projectSchema>;
