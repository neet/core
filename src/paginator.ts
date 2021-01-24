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

  // stub
  async *[Symbol.asyncIterator](): AsyncGenerator<
    Result,
    void,
    NextParams<Params> | undefined
  > {
    let nextUrl: string | undefined = this.url;
    let nextParams = this.params;

    while (nextUrl) {
      const response = await this.http.get<any>(nextUrl, nextParams);

      // Yield will be argument of next()
      const options = yield response.data;
      // Get next URL from "next" in the link header
      const linkHeaderNext = response.headers?.link?.match(
        /<(.+?)>; rel="next"/,
      )?.[1];

      if (options?.reset) {
        nextUrl = this.url;
        nextParams = this.params;
      } else {
        nextUrl = options?.url ?? linkHeaderNext;
        nextParams = options?.params;
      }
    }
  }
}
