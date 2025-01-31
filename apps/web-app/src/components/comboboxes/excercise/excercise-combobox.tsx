import { Excercise } from "@/types";
import { Combobox } from "@/components/ui/combobox";
import { useExcerciseCombobox } from "./excercise-combobox.hook";

export const ExcerciseCombobox = ({
  selected,
  placeholder,
  onSelect,
}: {
  selected: Excercise[];
  placeholder?: string;
  onSelect: (selected: Excercise[]) => void;
}) => {
  const { data } = useExcerciseCombobox();

  return (
    <Combobox
      data={data || []}
      labelKey="name"
      placeholder={placeholder ?? "Excercises..."}
      selected={selected || []}
      valueKey="excerciseId"
      onSelect={onSelect}
    />
  );
};
