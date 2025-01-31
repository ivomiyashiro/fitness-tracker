import BaseService, { RequestParams } from "..";
import { TrainingPlan } from "@/types";
import {
  TrainingPlanDeleteReponse,
  TrainingPlanRequest,
  TrainingPlanResponse,
} from "./training-plan.api.types";
import { WorkoutResponse } from "../workout/workout.api.types";

class Service {
  private baseService: BaseService;
  private endpoint = "/training-plans";

  constructor() {
    this.baseService = new BaseService();
  }

  public get(params?: RequestParams) {
    return this.baseService.get<TrainingPlanResponse>(this.endpoint, params);
  }

  public post(data: TrainingPlanRequest) {
    return this.baseService.post<TrainingPlanResponse>(this.endpoint, data);
  }

  public put(
    trainingPlanId: TrainingPlan["trainingPlanId"],
    data: TrainingPlanRequest,
  ) {
    return this.baseService.put<TrainingPlanResponse>(
      `${this.endpoint}/${trainingPlanId}`,
      data,
    );
  }

  public delete(trainingPlanId: TrainingPlan["trainingPlanId"]) {
    return this.baseService.delete<TrainingPlanDeleteReponse>(
      `${this.endpoint}/${trainingPlanId}`,
    );
  }

  public getWorkouts(trainingPlanId: TrainingPlan["trainingPlanId"]) {
    return this.baseService.get<WorkoutResponse>(
      `${this.endpoint}/${trainingPlanId}/workouts`,
    );
  }
}

export const TrainingPlanService = new Service();
