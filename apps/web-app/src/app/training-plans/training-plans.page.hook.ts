import { useState } from "react";
import { TrainingPlan } from "@/types";

export const useTrainingPlanDialog = () => {
  const [deleteDrawer, setDeleteDrawer] = useState<{
    isOpen: boolean;
    data: TrainingPlan;
  }>({
    isOpen: false,
    data: {
      trainingPlanId: "",
      name: "",
      description: "",
      weeks: 0,
      workouts: [],
    },
  });

  const handleDeleteTrainingPlan = (data: TrainingPlan) => {
    setDeleteDrawer({ data, isOpen: true });
  };

  const handleCloseDeleteDrawer = () => {
    setDeleteDrawer((prev) => ({ ...prev, isOpen: false }));
  };

  return {
    deleteDrawer,
    handleCloseDeleteDrawer,
    handleDeleteTrainingPlan,
  };
};

export const useTrainingPlanForm = () => {
  const [form, setForm] = useState<{
    isOpen: boolean;
    title: string;
    data: TrainingPlan;
  }>({
    isOpen: false,
    title: "New Training Plan",
    data: {
      trainingPlanId: "",
      name: "",
      description: "",
      weeks: 0,
      workouts: [],
    },
  });

  const handleEditTrainingPlan = (data: TrainingPlan) => {
    setForm({
      isOpen: true,
      title: `Editing ${data.name}`,
      data,
    });
  };

  const handleCloseForm = () => {
    setForm((prev) => ({ ...prev, isOpen: false }));
  };

  const handleAddNew = () => {
    setForm((prev) => ({ ...prev, title: "New Training Plan", isOpen: true }));
  };

  return {
    form,
    handleAddNew,
    handleCloseForm,
    handleEditTrainingPlan,
  };
};
