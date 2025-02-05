import { useState } from "react";
import { Workout } from "@/types";
import { useWorkoutDelete } from "@/hooks/use-workout";
import { WorkoutFormSchema } from "./workouts-form.hook";

export const useWorkoutsPage = () => {
  const { mutate: deleteWorkout, isPending: isDeletePending } =
    useWorkoutDelete();
  const [formTitle, setFormTitle] = useState("New Training Plan");

  const [isFormOpen, setFormOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const [workoutId, setWorkoutId] = useState("");
  const [formData, setFormData] = useState<WorkoutFormSchema>({
    name: "",
    trainingPlanWeekId: "",
    workoutId: "",
    order: 0,
  });

  const resetData = () => {
    setFormData({
      name: "",
      trainingPlanWeekId: "",
      workoutId: "",
      order: 0,
    });
  };

  const handleCreateNew = () => {
    setFormTitle("New Workout");
    resetData();
    setFormOpen(true);
  };

  const handleUpdateTrainingPlan = (data: Workout) => {
    setFormData(data);
    setFormTitle(`Editing ${data.name}`);
    setFormOpen(true);
  };

  const handleDeleteTrainingPlan = (data: Workout) => {
    setWorkoutId(data.workoutId);
    setFormData(data);
    setDrawerOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    resetData();
  };

  const handleCloseDeleteDrawer = () => {
    resetData();
    setDrawerOpen(false);
  };

  const handleConfirmDeleteDrawer = () => {
    resetData();
    setDrawerOpen(false);
    deleteWorkout(workoutId);
  };

  return {
    formData,
    formTitle,
    handleCloseDeleteDrawer,
    handleCloseForm,
    handleConfirmDeleteDrawer,
    handleCreateNew,
    handleDeleteTrainingPlan,
    handleUpdateTrainingPlan,
    isDeletePending,
    isDrawerOpen,
    isFormOpen,
    workoutId,
  };
};
