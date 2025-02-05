import { useParams } from "react-router";
import { DumbbellIcon } from "lucide-react";

import { PageLayout } from "@/components/layouts/page/page.layout";
import { List, ListItem } from "@/components/ui/list";
import { AppFallback } from "@/components/ui/app-fallback";

import { useWorkoutExercisesPageForm } from "./workout-exercises.page.hook";
import { WorkoutExercisesForm } from "./workout-exercises-form";
import { useWorkoutExercise } from "@/hooks/use-workout-exercise";

const WorkoutExercisesPage = () => {
  const { workoutId } = useParams();
  const { data: workoutExercises, isLoading } = useWorkoutExercise({
    workoutId,
  });

  const {
    formData,
    handleAddNew,
    handleCloseForm,
    handleEdit,
    isOpen: isFormOpen,
    title: formTitle,
    workoutExerciseId,
  } = useWorkoutExercisesPageForm({ workoutId });

  if (isLoading) {
    return <AppFallback />;
  }

  return (
    <PageLayout title="Workout Exercises" showPrevPage={true}>
      <List allowAdding={true} onAddNew={handleAddNew}>
        {workoutExercises?.map((workoutExercise) => (
          <ListItem
            key={workoutExercise.workoutExerciseId}
            allowDeleting={true}
            allowEditing={false}
            data={workoutExercise}
            displayExpr="exercise.name"
            itemIcon={DumbbellIcon}
            // onDeleteClick={handleDeleteTrainingPlan}
            onItemClick={handleEdit}
          />
        ))}
      </List>
      <WorkoutExercisesForm
        workoutExerciseId={workoutExerciseId}
        defaultValues={formData}
        open={isFormOpen}
        title={formTitle}
        onClose={handleCloseForm}
      />
      {/* <DrawerDialog
        open={isDialogOpen || isDeletePending}
        title={`Are you sure you want to delete ${dialogData.name}?`}
        onClose={handleCloseDeleteDrawer}
        onPrimaryButtonClick={() => deleteWorkout(dialogData.workoutId)}
        onSecondaryButtonClick={handleCloseDeleteDrawer}
      /> */}
    </PageLayout>
  );
};

export default WorkoutExercisesPage;
