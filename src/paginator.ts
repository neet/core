import { Http } from './http';
import { Response } from './http/http';

// type PaginatorOverrideNext<T> = {
//   readonly params?: T;
//   readonly urL?: string;
// };

// type PaginatorResetNext = {
//   readonly reset: true;
// };

// export type PaginatorNext<T> = PaginatorOverrideNext<T> | PaginatorResetNext;

export class Paginator<Params, Result>
  implements AsyncIterableIterator<Result> {
  private nextUrl?: string;
  private nextParams?: Params;

  constructor(
    private readonly http: Http,
    readonly initialUrl: string,
    readonly initialParams?: Params,
  ) {
    this.nextUrl = initialUrl;
    this.nextParams = initialParams;
  }

  private pluckNext = (link: string) => {
    return link?.match(/<(.+?)>; rel="next"/)?.[1];
  };

  async next(): Promise<IteratorResult<Result>> {
    const response: Response<Result> = await this.http.request({
      path: this.nextUrl,
      body: this.nextParams,
    });

    this.nextUrl = this.pluckNext(response.headers?.link as string);

    return {
      done: this.nextUrl != null,
      value: response.data,
    };
  }

  async return<T, U>(value: U | Promise<U>): Promise<IteratorResult<T, U>> {
    return {
      done: true,
      value: await value,
    };
  }

  async throw<T, U>(e: unknown): Promise<IteratorResult<T, U>> {
    throw e;
  }

  [Symbol.asyncIterator](): AsyncGenerator<Result, undefined, undefined> {
    return this;
  }
}
