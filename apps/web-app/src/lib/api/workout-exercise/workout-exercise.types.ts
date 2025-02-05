import { Set } from "@/types";

export type WorkoutExerciseResponse = {
  workoutExerciseId: string;
  order: number;
  exercise: {
    exerciseId: string;
    name: string;
  };
  workout: {
    workoutId: string;
    name: string;
  };
  sets: Set[];
};

export type WorkoutExerciseRequest = {
  workout: {
    workoutId: string;
    name: string;
  };
  exercise: {
    exerciseId: string;
    name: string;
  };
  order?: number;
  sets: {
    reps: number;
    rir: number;
  }[];
};

export type WorkoutExerciseUpdateRequest = {
  workout: {
    workoutId: string;
    name: string;
  };
  exercise: {
    exerciseId: string;
    name: string;
  };
  order?: number;
  sets: Set[];
};
