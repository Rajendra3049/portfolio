import { z } from "zod";

export const experienceSchema = z.object({
  role: z.string().min(1),
  company: z.string().min(1),
  duration: z.string().min(1),
  summary: z.string().min(1),
  impactPoints: z.array(z.string().min(1)).min(1),
  stack: z.array(z.string().min(1)).min(1),
  achievements: z.array(z.string().min(1)).min(1),
  metrics: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })),
});

export type Experience = z.infer<typeof experienceSchema>;
