import { useNavigate } from "react-router";
import { NotepadTextIcon } from "lucide-react";

import {
  useTrainingPlanDelete,
  useTrainingPlanGet,
} from "@/hooks/use-training-plan";

import { AppFallback } from "@/components/ui/app-fallback";
import { DrawerDialog } from "@/components/ui/drawer-dialog";
import { List, ListItem } from "@/components/ui/list";
import { PageLayout } from "@/components/layouts/page/page.layout";

import { useTrainingPlansPage } from "./training-plans.page.hook";
import { TrainingPlanForm } from "./training-plans-form";

const TrainingPlansPage = () => {
  const navigate = useNavigate();
  const { data: trainingPlans, isLoading } = useTrainingPlanGet();
  const { mutate: deleteTrainingPlan } = useTrainingPlanDelete();
  const {
    deleteDrawer,
    form,
    handleAddNew,
    handleCloseDeleteDrawer,
    handleCloseForm,
    handleDeleteTrainingPlan,
    handleEditTrainingPlan,
  } = useTrainingPlansPage();

  if (isLoading) {
    return <AppFallback />;
  }

  return (
    <PageLayout title="Training Plans">
      <List allowAdding={true} onAddNew={handleAddNew}>
        {trainingPlans?.map((trainingPlan, index) => (
          <ListItem
            key={trainingPlan.trainingPlanId ?? index}
            allowDeleting={true}
            allowEditing={true}
            data={trainingPlan}
            displayExpr="name"
            itemIcon={NotepadTextIcon}
            onDeleteClick={handleDeleteTrainingPlan}
            onEditClick={handleEditTrainingPlan}
            onItemClick={() =>
              navigate(
                `/training-plans/${trainingPlan.trainingPlanId}/workouts`,
              )
            }
          />
        ))}
      </List>
      <TrainingPlanForm
        defaultValues={form.data}
        open={form.isOpen}
        title={form.title}
        onClose={handleCloseForm}
      />
      <DrawerDialog
        open={deleteDrawer.isOpen}
        title={`Are you sure you want to delete ${deleteDrawer.data.name}?`}
        onClose={handleCloseDeleteDrawer}
        onPrimaryButtonClick={() =>
          deleteTrainingPlan(deleteDrawer.data.trainingPlanId)
        }
        onSecondaryButtonClick={handleCloseDeleteDrawer}
      />
    </PageLayout>
  );
};

export default TrainingPlansPage;
