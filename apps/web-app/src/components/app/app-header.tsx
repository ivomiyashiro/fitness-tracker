import { useNavigate } from "react-router";
import { ChevronLeftIcon, SettingsIcon } from "lucide-react";

import { useAppHeaderStore } from "@/stores/app.store";

import { Button } from "@/components/ui/button";

export const AppHeader = () => {
  const { prevPage, showSettings, title } = useAppHeaderStore((state) => state);

  const navigate = useNavigate();
  const handleToPrevPage = () => navigate(prevPage || "/");

  return (
    <header className="app-padding relative flex items-center justify-between border-b">
      {prevPage && (
        <Button
          title="Back"
          variant="secondary"
          className="app-left absolute"
          onClick={handleToPrevPage}
        >
          <ChevronLeftIcon />
        </Button>
      )}
      <h1 className={"w-full text-center text-xl"}>{title}</h1>
      {showSettings && (
        <Button title="Settings" variant="ghost" className="app-right absolute">
          <SettingsIcon />
        </Button>
      )}
    </header>
  );
};
