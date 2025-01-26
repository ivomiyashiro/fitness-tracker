import BaseService, { RequestParams } from "./base.service";
import type {
  TrainingPlan,
  TrainingPlanDeleteReponse,
  TrainingPlanPostRequest,
  TrainingPlanPutRequest,
  TrainingPlanResponse,
} from "./training-plan.service.types";

class Service {
  private baseService: BaseService;

  constructor() {
    this.baseService = new BaseService("/training-plans");
  }

  public get(params?: RequestParams) {
    return this.baseService.get<TrainingPlanResponse[]>(params);
  }

  public post(data: TrainingPlanPostRequest) {
    return this.baseService.post<TrainingPlanResponse>(data);
  }

  public put(data: TrainingPlanPutRequest) {
    return this.baseService.put<TrainingPlanResponse>(
      data.trainingPlanId,
      data,
    );
  }

  public delete(trainingPlanId: TrainingPlan["trainingPlanId"]) {
    return this.baseService.delete<TrainingPlanDeleteReponse>(trainingPlanId);
  }
}

export const TrainingPlanService = new Service();
