import BaseService from "..";
import { TrainingPlanWeek } from "@/types";
import { DeletedResponse, RequestParams } from "../index.types";
import {
  TrainingPlanWeekPostRequest,
  TrainingPlanWeekResponse,
} from "./training-plan-week.types";

class Service {
  private baseService: BaseService;
  private endpoint = "/training-plan-weeks";

  constructor() {
    this.baseService = new BaseService();
  }

  public get(params?: RequestParams) {
    return this.baseService.get<TrainingPlanWeekResponse[]>(
      this.endpoint,
      params,
    );
  }

  public post(data: TrainingPlanWeekPostRequest) {
    return this.baseService.post<TrainingPlanWeekResponse>(this.endpoint, data);
  }

  public delete(trainingPlanWeekId: TrainingPlanWeek["trainingPlanWeekId"]) {
    return this.baseService.delete<DeletedResponse>(
      `${this.endpoint}/${trainingPlanWeekId}`,
    );
  }
}

export const TrainingPlanWeekService = new Service();
