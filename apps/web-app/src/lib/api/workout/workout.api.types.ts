import { Workout } from "@/types";
import { ExerciseResponse } from "../exercise/exercise.api.types";

export type WorkoutPostRequest = {
  trainingPlanId: string;
  name: string;
  exercises: ExerciseResponse;
};

export type WorkoutResponse = Workout[];
