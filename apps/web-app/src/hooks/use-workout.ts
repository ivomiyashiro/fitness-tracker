import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { WorkoutService } from "@/lib/api/workout/workout.api";
import { WorkoutPostRequest } from "@/lib/api/workout/workout.api.types";

import { getTrainingPlansQueryKey } from "./use-training-plan";
import { Workout } from "@/types";

export const getTrainingPlanWorkoutsQueryKey = (handle?: string | number) => {
  return ["workout", handle];
};

export const useWorkoutGet = () => {
  return useQuery({
    queryKey: getTrainingPlanWorkoutsQueryKey(),
    queryFn: () => WorkoutService.get(),
  });
};

export const useWorkoutPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getTrainingPlansQueryKey(),
    mutationFn: (data: WorkoutPostRequest) => WorkoutService.post(data),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: getTrainingPlanWorkoutsQueryKey(),
      }),
  });
};

export const useWorkoutPut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getTrainingPlanWorkoutsQueryKey(),
    mutationFn: (
      data: WorkoutPostRequest & { workoutId: Workout["workoutId"] },
    ) => WorkoutService.put(data.workoutId, data),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: getTrainingPlanWorkoutsQueryKey(),
      }),
  });
};

export const useWorkoutDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getTrainingPlanWorkoutsQueryKey(),
    mutationFn: (workoutId: Workout["workoutId"]) =>
      WorkoutService.delete(workoutId),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: getTrainingPlanWorkoutsQueryKey(),
      }),
  });
};
