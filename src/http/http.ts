export type Payload = {};

export interface Http {
  readonly baseURL: string;
  readonly get: <T>(path: string, query?: Payload) => Promise<T>;
  readonly post: <T>(
    path: string,
    body?: Payload,
    initiator?: Payload,
  ) => Promise<T>;
  readonly put: <T>(path: string, body?: Payload) => Promise<T>;

  readonly patch: <T>(
    path: string,
    body?: Payload,
    initiator?: Payload,
  ) => Promise<T>;

  readonly delete: <T>(path: string, body?: Payload) => Promise<T>;
}

export type Method = <T>(http: Http) => T;
