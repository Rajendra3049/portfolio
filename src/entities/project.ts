import { z } from "zod";

export const projectMetricSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

export const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  shortDescription: z.string().min(1),
  longDescription: z.string().min(1),
  engineeringHighlights: z.array(z.string().min(1)).min(1),
  architectureNotes: z.array(z.string().min(1)).min(1),
  techStack: z.array(z.string().min(1)).min(1),
  screenshots: z.array(z.string().min(1)),
  liveUrl: z.string().url(),
  githubUrl: z.string().url(),
  featured: z.boolean(),
  categories: z.array(z.string().min(1)).min(1),
  metrics: z.array(projectMetricSchema),
  challenges: z.array(z.string().min(1)).min(1),
  outcomes: z.array(z.string().min(1)).min(1),
});

export type Project = z.infer<typeof projectSchema>;
