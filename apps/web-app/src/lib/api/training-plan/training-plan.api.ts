import BaseService from "..";
import { TrainingPlan } from "@/types";
import {
  TrainingPlanPostRequest,
  TrainingPlanPutRequest,
  TrainingPlanResponse,
} from "./training-plan.api.types";
import { WorkoutResponse } from "../workout/workout.api.types";
import { DeletedResponse, RequestParams } from "../index.types";

class Service {
  private baseService: BaseService;
  private endpoint = "/training-plans";

  constructor() {
    this.baseService = new BaseService();
  }

  public get(params?: RequestParams) {
    return this.baseService.get<TrainingPlanResponse[]>(this.endpoint, params);
  }

  public post(data: TrainingPlanPostRequest) {
    return this.baseService.post<TrainingPlanResponse>(this.endpoint, data);
  }

  public put(data: TrainingPlanPutRequest) {
    return this.baseService.put<TrainingPlanResponse>(
      `${this.endpoint}/${data.trainingPlanId}`,
      data,
    );
  }

  public delete(trainingPlanId: TrainingPlan["trainingPlanId"]) {
    return this.baseService.delete<DeletedResponse>(
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
