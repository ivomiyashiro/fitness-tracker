import z from "zod";

export const WorkoutExerciseCreateSchema = z.object({
  workout: z.object({
    workoutId: z.string(),
    name: z.string(),
  }),
  exercise: z.object({
    exerciseId: z.string().min(1, { message: "Exercise is required" }),
    name: z.string(),
  }),
  order: z.coerce.number().optional(),
  sets: z.array(
    z.object({
      reps: z.coerce.number().min(1, { message: "Reps are required" }),
      rir: z.coerce.number().min(0, { message: "RIR is required" }).max(2, {
        message: "Skinny bitch!",
      }),
    }),
  ),
});

export const WorkoutExerciseUpdateSchema = z.object({
  workout: z.object({
    workoutId: z.string(),
    name: z.string(),
  }),
  exercise: z.object({
    exerciseId: z.string().min(1, { message: "Exercise is required" }),
    name: z.string(),
  }),
  order: z.coerce.number().optional(),
  sets: z.array(
    z.object({
      setId: z.string(),
      reps: z.coerce.number().min(1, { message: "Reps are required" }),
      rir: z.coerce.number().min(0, { message: "RIR is required" }).max(2, {
        message: "Skinny bitch!",
      }),
    }),
  ),
});
