import { ExerciseResponse } from "../exercise/exercise.api.types";

export type WorkoutPostRequest = {
  trainingPlanWeekId: string;
  name: string;
  order?: number;
  exercises: ExerciseResponse[];
};

export type WorkoutPutRequest = {
  workoutId: string;
  trainingPlanWeekId: string;
  name: string;
  order?: number;
};

export type WorkoutResponse = {
  workoutId: string;
  trainingPlanWeekId: string;
  name: string;
  order: number;
};
