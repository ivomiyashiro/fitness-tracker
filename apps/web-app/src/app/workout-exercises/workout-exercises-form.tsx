import { DrawerForm } from "@/components/ui/drawer-form";
import { DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExerciseCombobox } from "@/components/comboboxes/exercise/exercise-combobox";

import {
  useWorkoutExercisesForm,
  WorkoutExerciseFormSchema,
} from "./workout-exercises-form.hook";
import { WorkoutExercisesSetsInput } from "./workout-exercises-sets-input";

export const WorkoutExercisesForm = ({
  title,
  open,
  defaultValues,
  workoutExerciseId,
  onClose,
}: {
  title: string;
  open: boolean;
  defaultValues: WorkoutExerciseFormSchema;
  workoutExerciseId?: string;
  onClose: () => void;
}) => {
  const { form, handleResetForm, isLoading, onSubmit } =
    useWorkoutExercisesForm({
      defaultValues,
      onClose,
      workoutExerciseId,
    });

  return (
    <DrawerForm
      form={form}
      open={open}
      onClose={() => {
        handleResetForm();
        onClose();
      }}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <DrawerHeader>
        <DrawerTitle>{title}</DrawerTitle>
      </DrawerHeader>
      <div className="flex flex-col gap-4 p-4">
        <FormField
          control={form.control}
          name="exercise.exerciseId"
          render={({ field }) => {
            const selectedExercise = field.value
              ? [
                  {
                    exerciseId: field.value,
                    name: "",
                  },
                ]
              : [];

            return (
              <FormItem>
                <FormLabel>Exercises</FormLabel>
                <FormControl>
                  <ExerciseCombobox
                    mode="single"
                    selected={selectedExercise}
                    onSelect={(exercise) =>
                      field.onChange(exercise[0]?.exerciseId || "")
                    }
                  />
                </FormControl>
                <p className="text-[0.8rem] font-medium text-destructive">
                  {form.formState.errors?.exercise?.exerciseId?.message}
                </p>
              </FormItem>
            );
          }}
        />
        <WorkoutExercisesSetsInput form={form} />
        <FormField
          control={form.control}
          name="workout.workoutId"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormLabel>WorkoutId</FormLabel>
              <FormControl>
                <Input
                  autoFocus={true}
                  className="mt-2"
                  placeholder="WorkoutId..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>{isLoading ? "Saving..." : "Save"}</Button>
      </div>
    </DrawerForm>
  );
};
