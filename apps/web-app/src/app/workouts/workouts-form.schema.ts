import z from "zod";

export const WorkoutPostSchema = z.object({
  trainingPlanId: z.string(),
  name: z.string().min(1, { message: "Name is required" }).max(50, {
    message: "Name must not exceed 50 characters",
  }),
  exercises: z.array(
    z.object({
      exerciseId: z.string(),
      name: z.string(),
    }),
  ),
});

export const WorkoutPutSchema = WorkoutPostSchema.extend({
  workoutId: z.string(),
});
