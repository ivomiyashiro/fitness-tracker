import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useWorkoutExerciseCreate,
  useWorkoutExerciseUpdate,
} from "@/hooks/use-workout-exercise";

import {
  WorkoutExerciseCreateSchema,
  WorkoutExerciseUpdateSchema,
} from "./workout-exercises-form.schema";

export type WorkoutExerciseFormSchema = z.infer<
  typeof WorkoutExerciseCreateSchema | typeof WorkoutExerciseUpdateSchema
>;

export const useWorkoutExercisesForm = ({
  defaultValues,
  workoutExerciseId,
  onClose,
}: {
  defaultValues: WorkoutExerciseFormSchema;
  workoutExerciseId?: string;
  onClose: () => void;
}) => {
  const { mutate: updateWorkoutExercise, isPending: isUpdatePending } =
    useWorkoutExerciseUpdate();
  const { mutate: createWorkoutExercise, isPending: isCreatePending } =
    useWorkoutExerciseCreate();

  const form = useForm<WorkoutExerciseFormSchema>({
    resolver: workoutExerciseId
      ? zodResolver(WorkoutExerciseUpdateSchema)
      : zodResolver(WorkoutExerciseCreateSchema),
    values: defaultValues,
  });

  const handleResetForm = () => {
    form.reset(defaultValues);
  };

  const onSubmit = (data: WorkoutExerciseFormSchema) => {
    if (workoutExerciseId) {
      updateWorkoutExercise({
        workoutExerciseId,
        ...data,
      });
    } else {
      createWorkoutExercise(data);
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
