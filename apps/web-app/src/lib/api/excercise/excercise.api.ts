import BaseService, { GetParams } from "..";
import { ExcerciseResponse } from "./excercise.api.types";

class Service {
  private baseService: BaseService;
  private endpoint = "/excercises";

  constructor() {
    this.baseService = new BaseService();
  }

  public get(params?: GetParams) {
    return this.baseService.get<ExcerciseResponse>(this.endpoint, params);
  }
}

export const ExcerciseService = new Service();
