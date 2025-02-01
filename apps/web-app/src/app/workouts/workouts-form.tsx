import { Workout } from "@/types";

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
import { ExerciseCombobox } from "@/components/comboboxes/exercise/exercise-combobox";
import { Button } from "@/components/ui/button";

import { useWorkoutForm } from "./workouts-form.hook";

export const WorkoutForm = ({
  title,
  open,
  defaultValues,
  onClose,
}: {
  title: string;
  open: boolean;
  defaultValues: Workout;
  onClose: () => void;
}) => {
  const { form, handleResetForm, isLoading, onSubmit } = useWorkoutForm({
    defaultValues,
    onClose,
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  autoFocus={true}
                  className="mt-2"
                  placeholder="Push, Tricep, Monday..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="exercises"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exercises</FormLabel>
              <FormControl>
                <ExerciseCombobox
                  selected={field.value}
                  onSelect={field.onChange}
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
