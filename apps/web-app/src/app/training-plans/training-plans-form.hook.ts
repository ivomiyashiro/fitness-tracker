import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import type { TrainingPlan } from "@/types";

import {
  useTrainingPlanPut,
  useTrainingPlanPost,
} from "@/hooks/use-training-plan";

import {
  TrainingPlanPostSchema,
  TrainingPlanPutSchema,
} from "./training-plans-form.schema";

type FormSchema =
  | z.infer<typeof TrainingPlanPostSchema>
  | z.infer<typeof TrainingPlanPutSchema>;

export const useTrainingPlanForm = ({
  defaultValues,
  onClose,
}: {
  defaultValues: TrainingPlan;
  onClose: () => void;
}) => {
  const { mutate: updateTrainingPlan, isPending: isUpdatePending } =
    useTrainingPlanPut();
  const { mutate: createTrainingPlan, isPending: isCreatePending } =
    useTrainingPlanPost();

  const form = useForm<FormSchema>({
    resolver: defaultValues.trainingPlanId
      ? zodResolver(TrainingPlanPutSchema)
      : zodResolver(TrainingPlanPostSchema),
    defaultValues,
  });

  // Resets input default values when training plan edit form is opened
  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const handleResetForm = () => {
    form.reset({
      description: "",
      name: "",
      weeks: 0,
    });
  };

  const onSubmit = (data: FormSchema) => {
    if (defaultValues.trainingPlanId) {
      updateTrainingPlan({
        trainingPlanId: defaultValues.trainingPlanId,
        name: data.name,
        description: data.description,
        weeks: data.weeks,
      });
    } else {
      createTrainingPlan({
        name: data.name,
        description: data.description,
        weeks: data.weeks,
      });
    }

    handleResetForm();
    onClose();
  };

  return {
    form,
    isLoading: isCreatePending || isUpdatePending,
    handleResetForm,
    onSubmit,
  };
};
