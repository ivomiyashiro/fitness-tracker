import { useState } from "react";
import { Workout } from "@/types";

export const useWorkoutPageForm = ({
  trainingPlanId,
}: {
  trainingPlanId?: string;
}) => {
  const DEFAULT_TITLE = "New Workout";
  const DEFAULT_FORM_DATA: Workout = {
    trainingPlanId: trainingPlanId ?? "",
    workoutId: "",
    order: 1,
    name: "",
    excercises: [],
  };
  const [isOpen, setOpen] = useState(false);
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [formData, setFormData] = useState<Workout>(DEFAULT_FORM_DATA);

  const handleAddNew = () => {
    setOpen(true);
    setTitle(DEFAULT_TITLE);
    setFormData(DEFAULT_FORM_DATA);
  };

  const handleCloseForm = () => {
    setOpen(false);
    setTitle(DEFAULT_TITLE);
    setFormData(DEFAULT_FORM_DATA);
  };

  const handleEditTrainingPlanWorkout = (data: Workout) => {
    setOpen(true);
    setTitle(`Editing ${data.name}`);
    setFormData(data);
  };

  return {
    formData,
    handleAddNew,
    handleCloseForm,
    handleEditTrainingPlanWorkout,
    isOpen,
    title,
  };
};

export const useWorkoutPageDialog = ({
  trainingPlanId,
}: {
  trainingPlanId?: string;
}) => {
  const [isOpen, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState<Workout>({
    trainingPlanId: trainingPlanId ?? "",
    workoutId: "",
    order: 1,
    name: "",
    excercises: [],
  });

  const handleDeleteTrainingPlan = (data: Workout) => {
    setOpen(true);
    setDialogData(data);
  };

  const handleCloseDeleteDrawer = () => {
    setOpen(false);
  };

  return {
    dialogData,
    handleCloseDeleteDrawer,
    handleDeleteTrainingPlan,
    isOpen,
  };
};
