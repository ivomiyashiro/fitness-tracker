import { Routes, Route } from "react-router";

import { AppLayout } from "@/components/app/app.layout";
import { TrainingPlans } from "@/components/training-plans/training-plans.page";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/training-plans">
          <Route index element={<TrainingPlans />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
