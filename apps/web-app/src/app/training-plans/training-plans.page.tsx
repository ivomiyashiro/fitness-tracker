import { useNavigate } from "react-router";
import { NotepadTextIcon } from "lucide-react";

import {
  useTrainingPlanDelete,
  useTrainingPlan,
} from "@/hooks/use-training-plan";

import { AppFallback } from "@/components/ui/app-fallback";
import { DrawerDialog } from "@/components/ui/drawer-dialog";
import { List, ListItem } from "@/components/ui/list";
import { PageLayout } from "@/components/layouts/page/page.layout";

import { useTrainingPlansPage } from "./training-plans.page.hook";
import { TrainingPlanForm } from "./training-plans-form";

const TrainingPlansPage = () => {
  const navigate = useNavigate();

  const { data: trainingPlans, isLoading } = useTrainingPlan();
  const { mutate: deleteTrainingPlan } = useTrainingPlanDelete();

  const {
    formData,
    formTitle,
    handleCloseDeleteDrawer,
    handleCloseForm,
    handleCreateNew,
    handleDeleteTrainingPlan,
    handleUpdateTrainingPlan,
    isDrawerOpen,
    isFormOpen,
    trainingPlanId,
  } = useTrainingPlansPage();

  if (isLoading) {
    return <AppFallback />;
  }

  return (
    <PageLayout title="Training Plans">
      <List allowAdding={true} onAddNew={handleCreateNew}>
        {trainingPlans?.map((trainingPlan, index) => (
          <ListItem
            key={trainingPlan.trainingPlanId ?? index}
            allowDeleting={true}
            allowEditing={true}
            data={trainingPlan}
            displayExpr="name"
            itemIcon={NotepadTextIcon}
            onDeleteClick={handleDeleteTrainingPlan}
            onEditClick={handleUpdateTrainingPlan}
            onItemClick={() =>
              navigate(`/training-plans/${trainingPlan.trainingPlanId}/weeks`)
            }
          />
        ))}
      </List>
      <TrainingPlanForm
        trainingPlanId={trainingPlanId}
        defaultValues={formData}
        open={isFormOpen}
        title={formTitle}
        onClose={handleCloseForm}
      />
      <DrawerDialog
        open={isDrawerOpen}
        title={`Are you sure you want to delete ${formData.name}?`}
        onClose={handleCloseDeleteDrawer}
        onConfirm={() => deleteTrainingPlan(trainingPlanId)}
        onCancel={handleCloseDeleteDrawer}
      />
    </PageLayout>
  );
};

export default TrainingPlansPage;
