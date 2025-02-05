import { useNavigate } from "react-router";
import { ChevronLeftIcon, SettingsIcon } from "lucide-react";

import { useAppHeaderStore } from "@/lib/stores/app-header.store";

import { Button } from "@/components/ui/button";

export const AppHeader = () => {
  const { data } = useAppHeaderStore();
  const navigate = useNavigate();
  const handleToPrevPage = () => {
    if (data?.showPrevPage && data.prevPage) {
      navigate(data.prevPage);
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="app-padding relative flex items-center justify-between border-b">
      {data?.showPrevPage && (
        <Button
          title="Back"
          variant="secondary"
          className="app-left absolute"
          onClick={handleToPrevPage}
        >
          <ChevronLeftIcon />
        </Button>
      )}
      <h1 className={"w-full text-center text-xl"}>{data?.title}</h1>
      {data?.showSettings && (
        <Button title="Settings" variant="ghost" className="app-right absolute">
          <SettingsIcon />
        </Button>
      )}
    </header>
  );
};
