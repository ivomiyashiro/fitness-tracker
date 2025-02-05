import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useTrainingPlanPut,
  useTrainingPlanPost,
} from "@/hooks/use-training-plan";

import {
  TrainingPlanPostScheme,
  TrainingPlanPutScheme,
} from "@/lib/schemes/training-plan.schemes";

export type TrainingPlanFormScheme =
  | z.infer<typeof TrainingPlanPutScheme>
  | z.infer<typeof TrainingPlanPostScheme>;

export const useTrainingPlanForm = ({
  defaultValues,
  trainingPlanId,
}: {
  trainingPlanId: string;
  defaultValues: TrainingPlanFormScheme;
}) => {
  const { mutate: updateTrainingPlan, isPending: isUpdatePending } =
    useTrainingPlanPut();
  const { mutate: createTrainingPlan, isPending: isCreatePending } =
    useTrainingPlanPost();

  const form = useForm<TrainingPlanFormScheme>({
    resolver: defaultValues
      ? zodResolver(TrainingPlanPutScheme)
      : zodResolver(TrainingPlanPostScheme),
    values: defaultValues,
  });

  const onSubmit = (data: TrainingPlanFormScheme) => {
    if (defaultValues) {
      updateTrainingPlan({
        trainingPlanId,
        name: data.name,
        description: data.description,
      });
    } else {
      createTrainingPlan({
        name: data.name,
        description: data.description,
      });
    }

    form.reset({
      description: "",
      name: "",
    });
  };

  return {
    form,
    isLoading: isCreatePending || isUpdatePending,
    onSubmit,
  };
};
