import { Outlet } from "react-router";

import { Toaster } from "@/components/ui/toaster";

import { AppHeader } from "./app-header";
import { AppNavigation } from "./app-navigation";

export const AppLayout = () => {
  return (
    <div className="flex h-screen flex-col">
      <AppHeader />
      <main className="app-padding h-full overflow-auto">
        <Outlet />
        <Toaster />
      </main>
      <AppNavigation />
    </div>
  );
};
