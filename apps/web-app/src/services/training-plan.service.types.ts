export type TrainingPlan = {
  trainingPlanId: string;
  name: string;
  description: string;
  weeks: number;
};

export type TrainingPlanPutRequest = {
  trainingPlanId: string;
} & TrainingPlanPostRequest;

export type TrainingPlanPostRequest = {
  name: string;
  description?: string;
  weeks: number;
};

export type TrainingPlanResponse = TrainingPlan;

export type TrainingPlanDeleteReponse = {
  deleted: boolean;
};
