import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Workout } from "@/types";

import { useWorkoutPost, useWorkoutPut } from "@/hooks/use-workout";

import { WorkoutPostSchema, WorkoutPutSchema } from "./workouts-form.schema";

type FormSchema =
  | z.infer<typeof WorkoutPutSchema>
  | z.infer<typeof WorkoutPostSchema>;

export const useWorkoutForm = ({
  defaultValues,
  onClose,
}: {
  defaultValues: Workout;
  onClose: () => void;
}) => {
  const { mutate: updateTrainingPlan, isPending: isUpdatePending } =
    useWorkoutPut();
  const { mutate: createTrainingPlan, isPending: isCreatePending } =
    useWorkoutPost();

  const form = useForm<FormSchema>({
    resolver: defaultValues.workoutId
      ? zodResolver(WorkoutPutSchema)
      : zodResolver(WorkoutPostSchema),
  });

  // Resets input default values when training plan edit form is opened
  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const handleResetForm = () => {
    form.reset({
      trainingPlanId: "",
      workoutId: "",
      name: "",
      exercises: [],
    });
  };

  const onSubmit = (data: FormSchema) => {
    if (defaultValues.workoutId) {
      updateTrainingPlan({
        workoutId: defaultValues.workoutId,
        trainingPlanId: defaultValues.trainingPlanId,
        name: data.name,
        exercises: data.exercises,
      });
    } else {
      createTrainingPlan({
        trainingPlanId: defaultValues.trainingPlanId,
        name: data.name,
        exercises: data.exercises,
      });
    }

    handleResetForm();
    onClose();
  };

  return {
    form,
    handleResetForm,
    isLoading: isCreatePending || isUpdatePending,
    onSubmit,
  };
};
