import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { TrainingPlan } from "@/types";
import {
  TrainingPlanPostRequest,
  TrainingPlanPutRequest,
} from "@/lib/api/training-plan/training-plan.api.types";

import { TrainingPlanService } from "@/lib/api/training-plan/training-plan.api";

export const getTrainingPlansQueryKey = (handle?: string | number) => {
  return ["training-plan", handle];
};

export const useTrainingPlan = () => {
  return useQuery({
    queryKey: getTrainingPlansQueryKey(),
    queryFn: () => TrainingPlanService.get(),
  });
};

export const useTrainingPlanPut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getTrainingPlansQueryKey(),
    mutationFn: (data: TrainingPlanPutRequest) => TrainingPlanService.put(data),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: getTrainingPlansQueryKey() }),
  });
};

export const useTrainingPlanPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getTrainingPlansQueryKey(),
    mutationFn: (data: TrainingPlanPostRequest) =>
      TrainingPlanService.post(data),

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
