import { Workout } from "@/types";
import BaseService from "..";
import {
  WorkoutPostRequest,
  WorkoutPutRequest,
  WorkoutResponse,
} from "./workout.api.types";
import { DeletedResponse, RequestParams } from "../index.types";

class Service {
  private baseService: BaseService;
  private endpoint = "/workouts";

  constructor() {
    this.baseService = new BaseService();
  }

  public get(params?: RequestParams) {
    return this.baseService.get<WorkoutResponse[]>(this.endpoint, params);
  }

  public post(data: WorkoutPostRequest) {
    return this.baseService.post<WorkoutResponse>(this.endpoint, data);
  }

  public put(data: WorkoutPutRequest) {
    return this.baseService.put<WorkoutResponse>(
      `${this.endpoint}/${data.workoutId}`,
      data,
    );
  }

  public delete(workoutId: Workout["workoutId"]) {
    return this.baseService.delete<DeletedResponse>(
      `${this.endpoint}/${workoutId}`,
    );
  }
}

export const WorkoutService = new Service();
