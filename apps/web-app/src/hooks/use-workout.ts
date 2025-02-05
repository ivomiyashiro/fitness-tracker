import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Workout } from "@/types";

import { WorkoutService } from "@/lib/api/workout/workout.api";
import { WorkoutPostRequest } from "@/lib/api/workout/workout.api.types";

import { getTrainingPlansQueryKey } from "./use-training-plan";

export const getTrainingPlanWorkoutsQueryKey = (handle?: string | number) => {
  return ["workout", handle];
};

export const useWorkout = ({
  trainingPlanWeekId,
}: {
  trainingPlanWeekId?: string;
}) => {
  return useQuery({
    queryKey: getTrainingPlanWorkoutsQueryKey(),
    queryFn: () => WorkoutService.get({ trainingPlanWeekId }),
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
