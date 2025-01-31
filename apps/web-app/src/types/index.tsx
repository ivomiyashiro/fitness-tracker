export type TrainingPlan = {
  trainingPlanId: string;
  description: string;
  name: string;
  weeks: number;
  workouts: Workout[];
};

export type Workout = {
  workoutId: string;
  excercises: Excercise[];
  name: string;
  order: number;
  trainingPlanId: string;
};

export type Excercise = {
  excerciseId: string;
  name: string;
};
