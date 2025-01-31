import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { TrainingPlan } from "@/types";
import { TrainingPlanRequest } from "@/lib/api/training-plan/training-plan.api.types";

import { TrainingPlanService } from "@/lib/api/training-plan/training-plan.api";

import { getTrainingPlanWorkoutsQueryKey } from "./use-workout";

export const getTrainingPlansQueryKey = (handle?: string | number) => {
  return ["training-plans", handle];
};

export const useTrainingPlanGet = () => {
  return useQuery({
    queryKey: getTrainingPlansQueryKey(),
    queryFn: () => TrainingPlanService.get(),
  });
};

export const useTrainingPlanPut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getTrainingPlansQueryKey(),
    mutationFn: (
      data: TrainingPlanRequest & {
        trainingPlanId: TrainingPlan["trainingPlanId"];
      },
    ) => TrainingPlanService.put(data.trainingPlanId, data),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: getTrainingPlansQueryKey() }),
  });
};

export const useTrainingPlanPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getTrainingPlansQueryKey(),
    mutationFn: (data: TrainingPlanRequest) => TrainingPlanService.post(data),

    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: getTrainingPlansQueryKey() }),
  });
};

export const useTrainingPlanDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getTrainingPlansQueryKey(),
    mutationFn: (trainingPlanId: TrainingPlan["trainingPlanId"]) =>
      TrainingPlanService.delete(trainingPlanId),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: getTrainingPlansQueryKey() }),
  });
};

export const useTrainingPlanWorkouts = ({
  trainingPlanId,
}: {
  trainingPlanId: TrainingPlan["trainingPlanId"];
}) => {
  return useQuery({
    queryKey: getTrainingPlanWorkoutsQueryKey(),
    queryFn: () => TrainingPlanService.getWorkouts(trainingPlanId),
  });
};
