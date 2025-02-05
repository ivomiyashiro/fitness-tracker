import { UseFormReturn, useFieldArray } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { WorkoutExerciseFormSchema } from "./workout-exercises-form.hook";

const useWorkoutExercisesSetsInput = ({
  form,
}: {
  form: UseFormReturn<WorkoutExerciseFormSchema>;
}) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sets",
  });

  const handleAddSet = () => {
    append({ reps: 8, rir: 1 });
  };

  const handleRemoveSet = (index: number) => {
    if (fields.length === 1) return;
    remove(index);
  };

  return { fields, handleAddSet, handleRemoveSet };
};

export const WorkoutExercisesSetsInput = ({
  form,
}: {
  form: UseFormReturn<WorkoutExerciseFormSchema>;
}) => {
  const { fields, handleAddSet, handleRemoveSet } =
    useWorkoutExercisesSetsInput({ form });

  return (
    <div className="mb-4 space-y-2">
      <FormLabel className="flex items-center justify-between">
        <span>Sets</span>
        <button
          className="text-primary hover:underline"
          type="button"
          onClick={handleAddSet}
        >
          + Add Set
        </button>
      </FormLabel>
      <ul className="flex flex-col gap-4 py-2">
        {fields.map((item, index) => (
          <li key={item.id} className="flex items-start gap-2">
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name={`sets.${index}.reps`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reps</FormLabel>
                    <FormControl>
                      <Input
                        min={1}
                        type="number"
                        placeholder="Reps..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name={`sets.${index}.rir`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RIR</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          min={0}
                          type="number"
                          placeholder="RIR..."
                          {...field}
                        />
                        <Button
                          variant="destructive"
                          type="button"
                          disabled={fields.length === 1}
                          onClick={() => handleRemoveSet(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
