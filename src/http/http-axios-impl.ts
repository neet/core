import axios, { AxiosInstance } from 'axios';

import { Serializer } from '../serializers';
import { Http, Payload } from './http';

export class HttpAxiosImpl implements Http {
  private readonly ax: AxiosInstance;

  constructor(readonly baseURL: string, readonly serializer: Serializer) {
    this.ax = axios.create({
      baseURL,
      transformRequest: (data, headers) =>
        this.serializer.serialize(headers['Content-Type'], data),
      transformResponse: (data, headers) =>
        this.serializer.deserialize(headers['Content-Type'], data),
      paramsSerializer: (params) =>
        this.serializer.serialize('application/json', params) as string,
    });
  }

  get<T>(path: string, params?: Payload): Promise<T> {
    return this.ax.get(path, {
      params,
    });
  }

  post<T>(path: string, data?: Payload): Promise<T> {
    return this.ax.post(path, {
      data,
    });
  }

  delete<T>(path: string, data?: Payload): Promise<T> {
    return this.ax.delete(path, {
      data,
    });
  }

  put<T>(path: string, data?: Payload): Promise<T> {
    return this.ax.put(path, {
      data,
    });
  }

  patch<T>(path: string, data?: Payload): Promise<T> {
    return this.ax.patch(path, {
      data,
    });
  }
}
