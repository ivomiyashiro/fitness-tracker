import z from "zod";

export const TrainingPlanPostSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z
    .string()
    .max(100, { message: "Description must not exceed 100 characters" })
    .optional(),
  weeks: z.coerce.number().min(1, { message: "Duration in weeks is required" }),
});

export const TrainingPlanPutSchema = TrainingPlanPostSchema.extend({
  trainingPlanId: z.string(),
});
