import z from "zod";

export const TrainingPlanPostScheme = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z
    .string()
    .max(100, { message: "Description must not exceed 100 characters" })
    .optional(),
});

export const TrainingPlanPutScheme = TrainingPlanPostScheme.extend({
  trainingPlanId: z.string(),
});
