import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import {
  MastoConflictError,
  MastoForbiddenError,
  MastoGoneError,
  MastoNotFoundError,
  MastoRateLimitError,
  MastoUnauthorizedError,
  MastoUnprocessableEntityError,
} from '../errors';
import { Serializer } from '../serializers';
import { Http, Payload } from './http';

export class HttpAxiosImpl implements Http {
  private readonly axios: AxiosInstance;

  constructor(readonly baseURL: string, readonly serializer: Serializer) {
    this.axios = axios.create({
      baseURL,
      transformRequest: (data, headers) =>
        this.serializer.serialize(headers['Content-Type'], data),
      transformResponse: (data, headers) =>
        this.serializer.deserialize(headers['Content-Type'], data),
      paramsSerializer: (params) =>
        this.serializer.serialize('application/json', params) as string,
    });
  }

  request<T>(options: AxiosRequestConfig) {
    try {
      return this.axios.request<T>(options);
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        throw error;
      }

      const status = error?.response?.status;
      const message =
        error?.response?.data?.error ?? 'Unexpected error occurred';

      switch (status) {
        case 401:
          throw new MastoUnauthorizedError(message);
        case 403:
          throw new MastoForbiddenError(message);
        case 404:
          throw new MastoNotFoundError(message);
        case 409:
          throw new MastoConflictError(message);
        case 410:
          throw new MastoGoneError(message);
        case 422:
          throw new MastoUnprocessableEntityError(message);
        case 429:
          throw new MastoRateLimitError(message);
        default:
          throw error;
      }
    }
  }

  get<T>(path: string, params?: Payload): Promise<T> {
    return this.request({
      method: 'get',
      url: path,
      params,
    }).then((response) => response.data as T);
  }

  post<T>(path: string, data?: Payload): Promise<T> {
    return this.request({
      method: 'post',
      url: path,
      data,
    }).then((response) => response.data as T);
  }

  delete<T>(path: string, data?: Payload): Promise<T> {
    return this.request({
      method: 'delete',
      url: path,
      data,
    }).then((response) => response.data as T);
  }

  put<T>(path: string, data?: Payload): Promise<T> {
    return this.request({
      method: 'put',
      url: path,
      data,
    }).then((response) => response.data as T);
  }

  patch<T>(path: string, data?: Payload): Promise<T> {
    return this.request({
      method: 'patch',
      url: path,
      data,
    }).then((response) => response.data as T);
  }
}
