import axios, { AxiosInstance, AxiosResponse } from "axios";
import { RequestData, RequestParams } from "./index.types";

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    return Promise.reject(error);
  },
);

class BaseService {
  async get<T>(endpoint: string, params: RequestParams = {}): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.get(endpoint, {
      params,
    });

    return response.data;
  }

  async post<T>(endpoint: string, data: RequestData): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.post(endpoint, data);
    return response.data;
  }

  async put<T>(endpoint: string, data: RequestData): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.put(endpoint, data);
    return response.data;
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.delete(endpoint);
    return response.data;
  }
}

export default BaseService;
