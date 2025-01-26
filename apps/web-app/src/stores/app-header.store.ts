import { createGlobalStore } from ".";

type HeaderStore = {
  prevPage?: string;
  showSettings?: boolean;
  title: string;
};

export const useAppHeaderStore = createGlobalStore<HeaderStore>(
  ["header-store"],
  {
    prevPage: undefined,
    showSettings: undefined,
    title: "Defaul title",
  },
);
