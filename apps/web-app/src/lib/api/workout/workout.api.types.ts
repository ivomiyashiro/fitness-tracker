import { Workout } from "@/types";
import { ExcerciseResponse } from "../excercise/excercise.api.types";

export type WorkoutPostRequest = {
  trainingPlanId: string;
  name: string;
  excercises: ExcerciseResponse;
};

export type WorkoutResponse = Workout[];
