import { Outlet } from "react-router";

import { AppHeader } from "./app-header";
import { AppNavigation } from "./app-navigation";

export const AppLayout = () => {
  return (
    <div className="flex h-screen flex-col">
      <AppHeader />
      <main className="app-padding h-full overflow-auto">
        <Outlet />
      </main>
      <AppNavigation />
    </div>
  );
};
