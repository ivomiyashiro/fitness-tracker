import { createGlobalStore } from ".";

export type HeaderStore = {
  prevPage?: string;
  showSettings?: boolean;
  showPrevPage?: boolean;
  title: string;
};

export const useAppHeaderStore = createGlobalStore<HeaderStore>(
  ["header-store"],
  {
    prevPage: undefined,
    showSettings: false,
    showPrevPage: false,
    title: "Default title",
  },
);
