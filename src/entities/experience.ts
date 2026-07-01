import { z } from "zod";

export const experiencePositionSchema = z.object({
  role: z.string().min(1),
  duration: z.string().min(1),
  headline: z.string().min(1).optional(),
  summary: z.string().min(1).optional(),
  scope: z.string().min(1).optional(),
  collapsedSummary: z.string().min(1).optional(),
  tools: z.array(z.string().min(1)).max(5).optional(),
  isPromotion: z.boolean().optional(),
  isCurrent: z.boolean().optional(),
  isCompact: z.boolean().optional(),
  impactPoints: z.array(z.string().min(1)).min(1).max(4),
  metrics: z
    .array(z.object({ label: z.string().min(1), value: z.string().min(1) }))
    .min(1)
    .max(3)
    .optional(),
});

export const experienceSchema = z
  .object({
    role: z.string().min(1),
    company: z.string().min(1),
    duration: z.string().min(1),
    summary: z.string().min(1),
    positions: z.array(experiencePositionSchema).optional(),
    impactPoints: z.array(z.string().min(1)).optional(),
    stack: z.array(z.string().min(1)).min(1),
    achievements: z.array(z.string().min(1)).min(1),
    metrics: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })),
  })
  .refine(
    (experience) =>
      (experience.positions?.length ?? 0) > 0 ||
      (experience.impactPoints?.length ?? 0) > 0,
    { message: "Either positions or impactPoints must be provided" },
  );

export type ExperiencePosition = z.infer<typeof experiencePositionSchema>;
export type Experience = z.infer<typeof experienceSchema>;
