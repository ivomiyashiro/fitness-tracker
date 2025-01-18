import BaseService, { RequestParams } from "./base.service";

class AppService {
  private baseService: BaseService;

  constructor() {
    this.baseService = new BaseService("/");
  }

  public getData<T>(params?: RequestParams) {
    return this.baseService.get<T>(params);
  }
}

export const appService = new AppService();
