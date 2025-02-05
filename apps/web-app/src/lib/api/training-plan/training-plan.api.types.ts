export type TrainingPlanResponse = {
  trainingPlanId: string;
  name: string;
  description: string;
};

export type TrainingPlanPostRequest = {
  name: string;
  description?: string;
};

export type TrainingPlanPutRequest = {
  trainingPlanId: string;
  name: string;
  description?: string;
};
