import { useQuery } from "@tanstack/react-query";
import { appService } from "@/services/app.service";

export const useApp = () => {
  const data = useQuery({
    queryKey: ["todos"],
    queryFn: () => appService.getData<{ message: string }>(),
  });

  return {
    data: data.data,
    isLoading: data.isLoading,
    isError: data.isError,
    error: data.error,
    refetch: async () => await data.refetch(),
  };
};
