import { useState } from "react";
import { TrainingPlan } from "@/types";

export const useTrainingPlansPage = () => {
  const [formTitle, setFormTitle] = useState("New Training Plan");

  const [isFormOpen, setFormOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const [trainingPlanId, setTrainingPlanId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const resetData = () => {
    setTrainingPlanId("");
    setFormData({
      name: "",
      description: "",
    });
  };

  const handleCreateNew = () => {
    setFormTitle("New Training Plan");
    resetData();
    setFormOpen(true);
  };

  const handleUpdateTrainingPlan = (data: TrainingPlan) => {
    setTrainingPlanId(data.trainingPlanId);
    setFormData({
      name: data.name,
      description: data.description,
    });
    setFormTitle(`Editing ${data.name}`);
    setFormOpen(true);
  };

  const handleDeleteTrainingPlan = (data: TrainingPlan) => {
    setFormData({
      name: data.name,
      description: data.description,
    });
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

  return {
    formData,
    formTitle,
    handleCloseDeleteDrawer,
    handleCloseForm,
    handleCreateNew,
    handleDeleteTrainingPlan,
    handleUpdateTrainingPlan,
    isDrawerOpen,
    isFormOpen,
    trainingPlanId,
  };
};
