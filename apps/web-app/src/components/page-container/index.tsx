import { useAppHeaderStore } from "@/stores/app-header.store";

export const PageContainer = ({
  children,
  title,
  showSettings = false,
  prevPage,
}: {
  children: React.ReactNode;
  title?: string;
  showSettings?: boolean;
  prevPage?: string;
}) => {
  const { setData } = useAppHeaderStore();
  setData({ title, showSettings, prevPage });

  return <>{children}</>;
};
