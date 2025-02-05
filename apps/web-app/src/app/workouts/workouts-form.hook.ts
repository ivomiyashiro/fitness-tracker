import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useWorkoutPost, useWorkoutPut } from "@/hooks/use-workout";

import { WorkoutPostSchema, WorkoutPutSchema } from "./workouts-form.schema";

export type WorkoutFormSchema =
  | z.infer<typeof WorkoutPutSchema>
  | z.infer<typeof WorkoutPostSchema>;

export const useWorkoutForm = ({
  workoutId,
  defaultValues,
}: {
  workoutId: string;
  defaultValues: WorkoutFormSchema;
}) => {
  const { mutate: updateTrainingPlan, isPending: isUpdatePending } =
    useWorkoutPut();
  const { mutate: createTrainingPlan, isPending: isCreatePending } =
    useWorkoutPost();

  const form = useForm<WorkoutFormSchema>({
    resolver: workoutId
      ? zodResolver(WorkoutPutSchema)
      : zodResolver(WorkoutPostSchema),
    values: defaultValues,
  });

  const onSubmit = (data: WorkoutFormSchema) => {
    if (workoutId) {
      updateTrainingPlan({
        name: data.name,
        trainingPlanWeekId: defaultValues.trainingPlanWeekId,
        workoutId: workoutId,
        exercises: data.exercises,
      });
    } else {
      createTrainingPlan({
        name: data.name,
        trainingPlanWeekId: defaultValues.trainingPlanWeekId,
        exercises: data.exercises,
      });
    }

    form.reset({
      name: "",
      trainingPlanWeekId: "",
      workoutId: "",
    });
  };

  return {
    form,
    isLoading: isCreatePending || isUpdatePending,
    onSubmit,
  };
};
