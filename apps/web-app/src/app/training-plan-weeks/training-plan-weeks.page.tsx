import { useNavigate, useParams } from "react-router";
import { CalendarIcon } from "lucide-react";

import { useTrainingPlanWeek } from "@/hooks/use-training-plan-week";

import { PageLayout } from "@/components/layouts/page/page.layout";
import { AppFallback } from "@/components/ui/app-fallback";
import { List, ListItem } from "@/components/ui/list";
import { DrawerDialog } from "@/components/ui/drawer-dialog";

import { useTrainingPlanWeeksPage } from "./training-plan-weeks.page.hook";

const TrainingPlanWeeksPage = () => {
  const navigate = useNavigate();
  const { trainingPlanId } = useParams();

  const { data: trainingPlanWeeks, isLoading } = useTrainingPlanWeek({
    trainingPlanId,
  });

  const {
    data,
    handleCloseDeleteDrawer,
    handleConfirmDrawer,
    handleCreateNew,
    handleDeleteTrainingPlan,
    isDrawerOpen,
  } = useTrainingPlanWeeksPage({ trainingPlanId });

  if (isLoading) {
    return <AppFallback />;
  }

  return (
    <PageLayout title="Training Plan Weeks" showPrevPage={true}>
      <List allowAdding={true} onAddNew={handleCreateNew}>
        {trainingPlanWeeks?.map((trainingPlanWeek, index) => (
          <ListItem
            key={trainingPlanWeek.trainingPlanWeekId ?? index}
            allowDeleting={true}
            allowEditing={false}
            data={trainingPlanWeek}
            displayExpr="name"
            itemIcon={CalendarIcon}
            onDeleteClick={handleDeleteTrainingPlan}
            onItemClick={() =>
              navigate(
                `/training-plans/${trainingPlanId}/weeks/${trainingPlanWeek.trainingPlanWeekId}/workouts`,
              )
            }
          />
        ))}
      </List>
      <DrawerDialog
        open={isDrawerOpen}
        title={`Are you sure you want to delete ${data?.name}?`}
        onClose={handleCloseDeleteDrawer}
        onConfirm={handleConfirmDrawer}
        onCancel={handleCloseDeleteDrawer}
      />
    </PageLayout>
  );
};

export default TrainingPlanWeeksPage;
