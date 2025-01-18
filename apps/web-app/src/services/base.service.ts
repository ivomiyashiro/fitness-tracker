import axios, { AxiosInstance, AxiosResponse } from "axios";

// Configuración general de Axios
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptores para manejar respuestas y errores
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  },
);

export interface RequestParams {
  [key: string]: unknown;
}

export interface RequestData {
  [key: string]: unknown;
}

class BaseService {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async get<T>(params: RequestParams = {}): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.get(this.endpoint, {
      params,
    });

    return response.data;
  }

  async post<T>(data: RequestData): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.post(
      this.endpoint,
      data,
    );
    return response.data;
  }

  async put<T>(id: string | number, data: RequestData): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.put(
      `${this.endpoint}/${id}`,
      data,
    );
    return response.data;
  }

  async delete<T>(id: string | number): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.delete(
      `${this.endpoint}/${id}`,
    );
    return response.data;
  }
}

export default BaseService;
