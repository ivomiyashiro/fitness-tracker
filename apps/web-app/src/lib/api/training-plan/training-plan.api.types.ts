import { TrainingPlan } from "@/types";

// Requests =>
export type TrainingPlanRequest = {
  name: string;
  description?: string;
  weeks: number;
};

// Responses =>
export type TrainingPlanResponse = TrainingPlan[];

export type TrainingPlanDeleteReponse = {
  deleted: boolean;
};
