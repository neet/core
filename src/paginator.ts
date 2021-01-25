import { Http } from './http';
import { Response } from './http/http';

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
      const response: Response<Result> = await this.http.request({
        path: nextUrl,
        body: nextParams,
      });

      // Yield will be argument of next()
      const params = yield response.data;

      if (params?.reset) {
        nextUrl = this.url;
        nextParams = this.params;
        continue;
      }

      nextUrl = params?.url ?? this.pluckNext(response.headers?.link as string);
      nextParams = params?.params;
    }
  }
}
