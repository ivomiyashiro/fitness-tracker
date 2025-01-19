import { useAppHeaderStore } from "@/stores/app.store";
import { useEffect } from "react";

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
  const { setPageData } = useAppHeaderStore((state) => state);

  useEffect(() => {
    setPageData({
      prevPage,
      title,
      showSettings,
    });
  }, [setPageData, prevPage, title, showSettings]);

  return <>{children}</>;
};
