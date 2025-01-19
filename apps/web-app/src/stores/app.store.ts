import { create } from "zustand";

type AppHeaderStore = {
  showSettings: boolean;
  prevPage?: string;
  title: string;
  setPageData: (data: Partial<AppHeaderStore>) => void;
};

export const useAppHeaderStore = create<AppHeaderStore>((set) => ({
  showSettings: false,
  prevPage: undefined,
  title: "Default Title",
  setPageData: set,
}));
