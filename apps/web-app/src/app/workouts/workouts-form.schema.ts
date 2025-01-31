import z from "zod";

export const WorkoutPostSchema = z.object({
  trainingPlanId: z.string(),
  name: z.string().min(1, { message: "Name is required" }).max(50, {
    message: "Name must not exceed 50 characters",
  }),
  excercises: z.array(
    z.object({
      excerciseId: z.string(),
      name: z.string(),
    }),
  ),
});

export const WorkoutPutSchema = WorkoutPostSchema.extend({
  workoutId: z.string(),
});
