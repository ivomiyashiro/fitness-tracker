import { useNavigate, useParams } from "react-router";
import { NotepadTextIcon } from "lucide-react";

import { useWorkout } from "@/hooks/use-workout";

import { AppFallback } from "@/components/ui/app-fallback";
import { DrawerDialog } from "@/components/ui/drawer-dialog";
import { List, ListItem } from "@/components/ui/list";
import { PageLayout } from "@/components/layouts/page/page.layout";

import { useWorkoutsPage } from "./workouts.page.hook";
import { WorkoutForm } from "./workouts-form";

const WorkoutsPage = () => {
  const navigate = useNavigate();
  const { trainingPlanId, trainingPlanWeekId } = useParams();

  const { data: workouts, isLoading } = useWorkout({
    trainingPlanWeekId,
  });

  const {
    formData,
    formTitle,
    handleCloseDeleteDrawer,
    handleCloseForm,
    handleConfirmDeleteDrawer,
    handleCreateNew,
    handleDeleteTrainingPlan,
    handleUpdateTrainingPlan,
    isDeletePending,
    isDrawerOpen,
    isFormOpen,
    workoutId,
  } = useWorkoutsPage();

  if (isLoading) {
    return <AppFallback />;
  }

  return (
    <PageLayout title="Workouts" showPrevPage={true}>
      <List allowAdding={true} onAddNew={handleCreateNew}>
        {workouts?.map((workout) => (
          <ListItem
            key={workout.workoutId}
            allowDeleting={true}
            allowEditing={true}
            data={workout}
            displayExpr="name"
            itemIcon={NotepadTextIcon}
            onDeleteClick={handleDeleteTrainingPlan}
            onEditClick={handleUpdateTrainingPlan}
            onItemClick={() =>
              navigate(
                `/training-plans/${trainingPlanId}/weeks/${trainingPlanWeekId}/workouts/${workout.workoutId}/exercises`,
              )
            }
          />
        ))}
      </List>
      <WorkoutForm
        workoutId={workoutId}
        defaultValues={formData}
        open={isFormOpen}
        title={formTitle}
        onClose={handleCloseForm}
      />
      <DrawerDialog
        open={isDrawerOpen || isDeletePending}
        title={`Are you sure you want to delete ${formData?.name}?`}
        onClose={handleCloseDeleteDrawer}
        onConfirm={handleConfirmDeleteDrawer}
        onCancel={handleCloseDeleteDrawer}
      />
    </PageLayout>
  );
};

export default WorkoutsPage;
