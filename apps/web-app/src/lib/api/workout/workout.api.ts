import { Workout } from "@/types";
import BaseService, { RequestParams } from "..";
import { WorkoutPostRequest, WorkoutResponse } from "./workout.api.types";

class Service {
  private baseService: BaseService;
  private endpoint = "/workouts";

  constructor() {
    this.baseService = new BaseService();
  }

  public get(params?: RequestParams) {
    return this.baseService.get<Workout[]>(this.endpoint, params);
  }

  public post(data: WorkoutPostRequest) {
    return this.baseService.post<WorkoutResponse>(this.endpoint, data);
  }

  public put(workoutId: Workout["workoutId"], data: WorkoutPostRequest) {
    return this.baseService.put<WorkoutResponse>(
      `${this.endpoint}/${workoutId}`,
      data,
    );
  }

  public delete(workoutId: Workout["workoutId"]) {
    return this.baseService.delete<WorkoutResponse>(
      `${this.endpoint}/${workoutId}`,
    );
  }
}

export const WorkoutService = new Service();
