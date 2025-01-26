import type { TrainingPlanResponse } from "@/services/training-plan.service.types";
import { useTrainingPlanForm } from "./training-plan-form.hook";
import { Button } from "../ui/button";
import { DrawerHeader, DrawerTitle } from "../ui/drawer";
import { DrawerForm } from "../ui/drawer-form";
import { Input } from "../ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export const TrainingPlanForm = ({
  title,
  open,
  defaultValues,
  onClose,
}: {
  title: string;
  open: boolean;
  defaultValues: TrainingPlanResponse;
  onClose: () => void;
}) => {
  const { form, onSubmit, handleResetForm, isLoading } = useTrainingPlanForm({
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  className="mt-2"
                  placeholder="Description..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weeks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duartion in weeks</FormLabel>
              <FormControl>
                <Input
                  className="mt-2"
                  placeholder="0"
                  type="number"
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
