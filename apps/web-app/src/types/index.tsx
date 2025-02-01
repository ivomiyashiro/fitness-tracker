export type TrainingPlan = {
  trainingPlanId: string;
  description: string;
  name: string;
  weeks: number;
  workouts: Workout[];
};

export type Workout = {
  workoutId: string;
  exercises: Exercise[];
  name: string;
  order: number;
  trainingPlanId: string;
};

export type Exercise = {
  exerciseId: string;
  name: string;
};
