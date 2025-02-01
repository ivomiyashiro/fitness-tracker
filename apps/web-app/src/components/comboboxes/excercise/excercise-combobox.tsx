import { Exercise } from "@/types";
import { Combobox } from "@/components/ui/combobox";
import { useExerciseCombobox } from "./exercise-combobox.hook";

export const ExerciseCombobox = ({
  selected,
  placeholder,
  onSelect,
}: {
  selected: Exercise[];
  placeholder?: string;
  onSelect: (selected: Exercise[]) => void;
}) => {
  const { data } = useExerciseCombobox();

  return (
    <Combobox
      data={data || []}
      labelKey="name"
      placeholder={placeholder ?? "Exercises..."}
      selected={selected || []}
      valueKey="exerciseId"
      onSelect={onSelect}
    />
  );
};
