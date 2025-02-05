export type TrainingPlan = {
  trainingPlanId: string;
  description: string;
  name: string;
};

export type TrainingPlanWeek = {
  trainingPlanWeekId: string;
  trainingPlanId: string;
  name: string;
};

export type Workout = {
  workoutId: string;
  name: string;
  order: number;
  trainingPlanWeekId: string;
};

export type Exercise = {
  exerciseId: string;
  name: string;
};

export type WorkoutExercise = {
  workoutExerciseId: string;
  order: number;
  workout: {
    workoutId: string;
    name: string;
  };
  exercise: {
    exerciseId: string;
    name: string;
  };
  sets: Set[];
};

export type Set = {
  setId: string;
  reps: number;
  rir: number;
};
