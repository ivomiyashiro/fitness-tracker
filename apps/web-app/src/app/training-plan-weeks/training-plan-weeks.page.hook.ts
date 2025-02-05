import { useState } from "react";
import { TrainingPlanWeek } from "@/types";
import {
  useTrainingPlanWeekDelete,
  useTrainingPlanWeekPost,
} from "@/hooks/use-training-plan-week";

export const useTrainingPlanWeeksPage = ({
  trainingPlanId,
}: {
  trainingPlanId?: string;
}) => {
  const { mutate: deleteTrainingPlanWeek } = useTrainingPlanWeekDelete();
  const { mutate: createTrainingPlanWeek } = useTrainingPlanWeekPost();

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [data, setData] = useState<TrainingPlanWeek>();

  const handleCreateNew = () => {
    if (!trainingPlanId) return;

    createTrainingPlanWeek({
      trainingPlanId,
    });
  };

  const handleDeleteTrainingPlan = (data: TrainingPlanWeek) => {
    setDrawerOpen(true);
    setData(data);
  };

  const handleCloseDeleteDrawer = () => {
    setDrawerOpen(false);
    setData(undefined);
  };

  const handleConfirmDrawer = () =>
    deleteTrainingPlanWeek(data?.trainingPlanWeekId ?? "");

  return {
    data,
    handleCloseDeleteDrawer,
    handleConfirmDrawer,
    handleCreateNew,
    handleDeleteTrainingPlan,
    isDrawerOpen,
  };
};
