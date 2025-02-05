import z from "zod";

export const WorkoutPostSchema = z.object({
  trainingPlanWeekId: z.string(),
  name: z.string().min(1, { message: "Name is required" }).max(50, {
    message: "Name must not exceed 50 characters",
  }),
  order: z.coerce.number().optional(),
  exercises: z.array(
    z.object({
      exerciseId: z.string().min(1, { message: "Exercise is required" }),
      name: z.string(),
    }),
  ),
});

export const WorkoutPutSchema = WorkoutPostSchema.extend({
  workoutId: z.string(),
});
