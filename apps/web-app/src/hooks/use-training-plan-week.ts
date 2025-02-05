import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { TrainingPlanWeek } from "@/types";

import { TrainingPlanWeekService } from "@/lib/api/training-plan-week/training-plan-week.api";
import { TrainingPlanWeekPostRequest } from "@/lib/api/training-plan-week/training-plan-week.types";

export const getTrainingPlanWeekQueryKey = (handle?: string | number) => {
  return ["training-plan-week", handle];
};

export const useTrainingPlanWeek = ({
  trainingPlanId,
}: {
  trainingPlanId?: string;
}) => {
  return useQuery({
    queryKey: getTrainingPlanWeekQueryKey(),
    queryFn: () => TrainingPlanWeekService.get({ trainingPlanId }),
  });
};

export const useTrainingPlanWeekPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getTrainingPlanWeekQueryKey(),
    mutationFn: (data: TrainingPlanWeekPostRequest) =>
      TrainingPlanWeekService.post(data),

    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: getTrainingPlanWeekQueryKey(),
      }),
  });
};

export const useTrainingPlanWeekDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getTrainingPlanWeekQueryKey(),
    mutationFn: (trainingPlanId: TrainingPlanWeek["trainingPlanId"]) =>
      TrainingPlanWeekService.delete(trainingPlanId),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: getTrainingPlanWeekQueryKey(),
      }),
  });
};
