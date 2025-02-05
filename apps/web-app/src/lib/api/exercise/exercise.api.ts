import BaseService from "..";
import { GetParams } from "../index.types";
import { ExerciseResponse } from "./exercise.api.types";

class Service {
  private baseService: BaseService;
  private endpoint = "/exercises";

  constructor() {
    this.baseService = new BaseService();
  }

  public get(params?: GetParams) {
    return this.baseService.get<ExerciseResponse>(this.endpoint, params);
  }
}

export const ExerciseService = new Service();
