import { Http } from './http';

/**
 * Argument of `Gateway.paginate().next()`.
 * When reset = true specified, other params won't be accepted
 */
export type NextParams<Params> =
  | {
      reset: boolean;
      url?: undefined;
      params?: undefined;
    }
  | {
      reset?: undefined;
      url?: string;
      params?: Params;
    };

export class Paginator<Params, Result> implements AsyncIterable<Result> {
  constructor(
    private readonly http: Http,
    private readonly url: string,
    private readonly params?: Params,
  ) {}

  private pluckNext = (link: string) => {
    return link?.match(/<(.+?)>; rel="next"/)?.[1];
  };

  // stub
  async *[Symbol.asyncIterator](): AsyncGenerator<
    Result,
    void,
    NextParams<Params> | undefined
  > {
    let nextUrl: string | undefined = this.url;
    let nextParams = this.params;

    while (nextUrl) {
      const response: any = await this.http.request(nextUrl, nextParams);

      // Yield will be argument of next()
      const params = yield response;

      if (params?.reset) {
        nextUrl = this.url;
        nextParams = this.params;
        continue;
      }

      nextUrl = params?.url ?? this.pluckNext(response.headers?.link);
      nextParams = params?.params;
    }
  }
}
