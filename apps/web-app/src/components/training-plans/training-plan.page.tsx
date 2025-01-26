import { useNavigate } from "react-router";
import { NotepadTextIcon } from "lucide-react";
import type { TrainingPlanResponse } from "@/services/training-plan.service.types";
import {
  useDeleteTrainingPlan,
  useGetTraininPlan,
} from "@/hooks/use-training-plan";
import { useTrainingPlansPage } from "./training-plan.page.hook";
import { PageContainer } from "@/components/page-container";
import { List, ListItem } from "@/components/ui/list";
import { DrawerDialog } from "../ui/drawer-dialog";
import { TrainingPlanForm } from "./training-plan-form";

export const TrainingPlansPage = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetTraininPlan();
  const { mutate: deleteTrainingPlan } = useDeleteTrainingPlan();
  const {
    deleteDrawer,
    form,
    handleAddNewTrainingPlan,
    handleCloseDeleteDrawer,
    handleCloseForm,
    handleDeleteTrainingPlan,
    handleEditTrainingPlan,
  } = useTrainingPlansPage();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer title="Training Plans">
      <List allowAdding={true} onAddNew={handleAddNewTrainingPlan}>
        {data?.map((trainingPlan, index) => (
          <ListItem<TrainingPlanResponse>
            key={trainingPlan.trainingPlanId ?? index}
            allowDeleting={true}
            allowEditing={true}
            data={trainingPlan}
            displayExpr="name"
            itemIcon={NotepadTextIcon}
            onDeleteClick={handleDeleteTrainingPlan}
            onEditClick={handleEditTrainingPlan}
            onItemClick={() =>
              navigate("/training-plans/" + trainingPlan.trainingPlanId)
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
    </PageContainer>
  );
};
