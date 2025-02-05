import { Exercise } from "@/types";
import { Combobox } from "@/components/ui/combobox";
import { useExerciseCombobox } from "./exercise-combobox.hook";

export const ExerciseCombobox = ({
  selected,
  placeholder,
  mode = "multiple",
  onSelect,
}: {
  selected?: Exercise[];
  placeholder?: string;
  mode?: "single" | "multiple";
  onSelect: (selected: Exercise[]) => void;
}) => {
  const { data } = useExerciseCombobox();
  const selectedExercise = data?.filter((exercise) =>
    selected?.some((ex) => ex.exerciseId === exercise.exerciseId),
  );

  return (
    <Combobox
      data={data || []}
      labelKey="name"
      mode={mode}
      placeholder={
        (placeholder ?? mode === "multiple") ? "Exercises..." : "Exercise..."
      }
      selected={selectedExercise || []}
      valueKey="exerciseId"
      onSelect={onSelect}
    />
  );
};
