import { Routes, Route } from "react-router";

import { AppLayout } from "@/components/app/app.layout";
import { TrainingPlansPage } from "@/components/training-plans/training-plan.page";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/training-plans">
          <Route index element={<TrainingPlansPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
