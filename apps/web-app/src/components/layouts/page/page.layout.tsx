import { useAppHeaderStore } from "@/lib/stores/app-header.store";

export const PageLayout = ({
  children,
  title,
  showSettings = false,
  prevPage,
  description = "React + TypeScript + .NET",
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showSettings?: boolean;
  prevPage?: string;
}) => {
  const { setData } = useAppHeaderStore();
  setData({ title, showSettings, prevPage });

  return (
    <>
      <title>{title + " - Fitness Planner"}</title>
      <meta name="description" content={description} />
      {children}
    </>
  );
};
