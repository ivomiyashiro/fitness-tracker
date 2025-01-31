import { useNavigate, useParams } from "react-router";
import { NotepadTextIcon } from "lucide-react";

import { useTrainingPlanWorkouts } from "@/hooks/use-training-plan";
import { useWorkoutDelete } from "@/hooks/use-workout";

import { AppFallback } from "@/components/ui/app-fallback";
import { DrawerDialog } from "@/components/ui/drawer-dialog";
import { List, ListItem } from "@/components/ui/list";
import { PageLayout } from "@/components/layouts/page/page.layout";

import { useWorkoutPageDialog, useWorkoutPageForm } from "./workouts.page.hook";
import { WorkoutForm } from "./workouts-form";

const WorkoutsPage = () => {
  const navigate = useNavigate();
  const { trainingPlanId } = useParams();

  const { data: workouts, isLoading } = useTrainingPlanWorkouts({
    trainingPlanId: trainingPlanId ?? "",
  });

  const { mutate: deleteWorkout, isPending: isDeletePending } =
    useWorkoutDelete();

  const {
    dialogData,
    isOpen: isDialogOpen,
    handleCloseDeleteDrawer,
    handleDeleteTrainingPlan,
  } = useWorkoutPageDialog({
    trainingPlanId,
  });

  const {
    formData,
    isOpen: isFormOpen,
    title: formTitle,
    handleCloseForm,
    handleAddNew,
    handleEditTrainingPlanWorkout,
  } = useWorkoutPageForm({ trainingPlanId });

  if (isLoading) {
    return <AppFallback />;
  }

  return (
    <PageLayout prevPage="/training-plans" title="Workouts">
      <List allowAdding={true} onAddNew={handleAddNew}>
        {workouts?.map((workout) => (
          <ListItem
            key={workout.workoutId}
            allowDeleting={true}
            allowEditing={true}
            data={workout}
            displayExpr="name"
            itemIcon={NotepadTextIcon}
            onDeleteClick={handleDeleteTrainingPlan}
            onEditClick={(data) =>
              handleEditTrainingPlanWorkout({
                ...data,
                trainingPlanId: trainingPlanId ?? "",
              })
            }
            onItemClick={() =>
              navigate(
                `/training-plans/${trainingPlanId}/workouts/${workout.workoutId}`,
              )
            }
          />
        ))}
      </List>
      <WorkoutForm
        defaultValues={formData}
        open={isFormOpen}
        title={formTitle}
        onClose={handleCloseForm}
      />
      <DrawerDialog
        open={isDialogOpen || isDeletePending}
        title={`Are you sure you want to delete ${dialogData.name}?`}
        onClose={handleCloseDeleteDrawer}
        onPrimaryButtonClick={() => deleteWorkout(dialogData.workoutId)}
        onSecondaryButtonClick={handleCloseDeleteDrawer}
      />
    </PageLayout>
  );
};

export default WorkoutsPage;
