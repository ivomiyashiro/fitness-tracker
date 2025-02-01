import { useQuery } from "@tanstack/react-query";
import { ExerciseService } from "@/lib/api/exercise/exercise.api";
import { GetParams } from "@/lib/api";

export const useExerciseCombobox = ({
  limit,
  offset,
  search,
}: GetParams = {}) => {
  return useQuery({
    queryKey: ["exercises"],
    queryFn: () => ExerciseService.get({ limit, offset, search }),
    refetchOnMount: false,
  });
};
