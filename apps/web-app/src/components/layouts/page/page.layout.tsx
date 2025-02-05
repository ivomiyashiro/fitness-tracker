import { HeaderStore, useAppHeaderStore } from "@/lib/stores/app-header.store";

export const PageLayout = ({
  children,
  description = "React + TypeScript + .NET",
  prevPage,
  showPrevPage = false,
  showSettings = false,
  title,
}: {
  children: React.ReactNode;
  description?: string;
} & HeaderStore) => {
  const { setData } = useAppHeaderStore();
  setData({ title, showSettings, showPrevPage, prevPage });

  return (
    <>
      <title>{title + " - Fitness Planner"}</title>
      <meta name="description" content={description} />
      {children}
    </>
  );
};
