import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { WorkoutExerciseRequest } from "@/lib/api/workout-exercise/workout-exercise.types";
import { WorkoutExerciseService } from "@/lib/api/workout-exercise/workout-exercise.api";

export const getWorkoutExercisesQueryKey = (handle?: string) => [
  "workout-exercise",
  handle,
];

export const useWorkoutExercise = ({ workoutId }: { workoutId?: string }) => {
  return useQuery({
    queryKey: getWorkoutExercisesQueryKey(),
    queryFn: () => WorkoutExerciseService.get({ workoutId }),
  });
};

export const useWorkoutExerciseCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getWorkoutExercisesQueryKey(),
    mutationFn: (data: WorkoutExerciseRequest) =>
      WorkoutExerciseService.post(data),

    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: getWorkoutExercisesQueryKey(),
      }),
  });
};

export const useWorkoutExerciseUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getWorkoutExercisesQueryKey(),
    mutationFn: (
      data: { workoutExerciseId: string } & WorkoutExerciseRequest,
    ) => WorkoutExerciseService.put(data.workoutExerciseId, data),

    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: getWorkoutExercisesQueryKey(),
      }),
  });
};
