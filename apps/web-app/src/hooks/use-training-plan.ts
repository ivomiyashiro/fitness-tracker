import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TrainingPlanService } from "@/services/training-plan.service";
import {
  TrainingPlanResponse,
  TrainingPlanPostRequest,
  TrainingPlanPutRequest,
  TrainingPlan,
} from "@/services/training-plan.service.types";

const getQueryKey = (handle?: string | number) => {
  return ["training-plans", handle];
};

export const useGetTraininPlan = () => {
  return useQuery({
    queryKey: getQueryKey(),
    queryFn: () => TrainingPlanService.get(),
  });
};

export const usePutTrainingPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getQueryKey(),
    mutationFn: (data: TrainingPlanPutRequest) => TrainingPlanService.put(data),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: getQueryKey() });

      const prevData = queryClient.getQueryData(
        getQueryKey(),
      ) as TrainingPlanResponse[];

      queryClient.setQueryData(
        getQueryKey(),
        prevData.map((data) =>
          data.trainingPlanId === newData.trainingPlanId ? newData : data,
        ),
      );

      return { prevData, newData };
    },
    onError: (_err, _newData, context) => {
      queryClient.setQueryData(["todos"], context?.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: getQueryKey() });
    },
  });
};

export const usePostTrainingPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getQueryKey(),
    mutationFn: (data: TrainingPlanPostRequest) =>
      TrainingPlanService.post(data),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: getQueryKey() });

      const prevData = queryClient.getQueryData(
        getQueryKey(),
      ) as TrainingPlanResponse[];

      queryClient.setQueryData(getQueryKey(), [...prevData, newData]);

      return { prevData, newData };
    },
    onError: (_err, _newData, context) => {
      queryClient.setQueryData(["todos"], context?.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: getQueryKey() });
    },
  });
};

export const useDeleteTrainingPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getQueryKey(),
    mutationFn: (trainingPlanId: TrainingPlan["trainingPlanId"]) =>
      TrainingPlanService.delete(trainingPlanId),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: getQueryKey() });

      const prevData = queryClient.getQueryData(
        getQueryKey(),
      ) as TrainingPlanResponse[];

      queryClient.setQueryData(
        getQueryKey(),
        prevData.filter((data) => data.trainingPlanId !== newData),
      );

      return { prevData, newData };
    },
    onError: (_err, _newData, context) => {
      queryClient.setQueryData(["todos"], context?.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: getQueryKey() });
    },
  });
};
