import { useState } from "react";
import { WorkoutExercise } from "@/types";
import { WorkoutExerciseFormSchema } from "./workout-exercises-form.hook";

export const useWorkoutExercisesPageForm = ({
  workoutId,
}: {
  workoutId?: string;
}) => {
  const DEFAULT_TITLE = "New Exercise";
  const DEFAULT_FORM_DATA: WorkoutExerciseFormSchema = {
    order: 1,
    exercise: {
      exerciseId: "",
      name: "",
    },
    workout: {
      workoutId: workoutId ?? "",
      name: "",
    },
    sets: [
      {
        reps: 8,
        rir: 1,
      },
    ],
  };
  const [isOpen, setOpen] = useState(false);
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [workoutExerciseId, setWorkoutExerciseId] = useState("");
  const [formData, setFormData] =
    useState<WorkoutExerciseFormSchema>(DEFAULT_FORM_DATA);

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

  const handleEdit = (data: WorkoutExercise) => {
    setOpen(true);
    setTitle(`Editing ${data.exercise.name}`);
    setWorkoutExerciseId(data.workoutExerciseId);
    setFormData(data);
  };

  return {
    formData,
    handleAddNew,
    handleCloseForm,
    handleEdit,
    isOpen,
    title,
    workoutExerciseId,
  };
};
