import { useQuery } from "@tanstack/react-query";
import { ExcerciseService } from "@/lib/api/excercise/excercise.api";
import { GetParams } from "@/lib/api";

export const useExcerciseCombobox = ({
  limit,
  offset,
  search,
}: GetParams = {}) => {
  return useQuery({
    queryKey: ["excercises"],
    queryFn: () => ExcerciseService.get({ limit, offset, search }),
    refetchOnMount: false,
  });
};
