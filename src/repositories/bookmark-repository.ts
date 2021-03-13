import { version } from '../decorators';
import { Status } from '../entities';
import { Http } from '../http';
import { Paginator } from '../paginator';
import { DefaultPaginationParams, Repository } from '../repository';

export class BookmarkRepository implements Repository<Status> {
  constructor(private readonly http: Http, readonly version: string) {}

  async *[Symbol.asyncIterator]() {
    yield* this.getIterator();
  }

  /**
   * Statuses the user has bookmarked.
   * @param params Parameters
   * @return Array of Statuses
   * @see https://docs.joinmastodon.org/methods/accounts/bookmarks/
   */
  @version({ since: '3.1.0' })
  getIterator(
    params?: DefaultPaginationParams,
  ): AsyncIterableIterator<Status[]> {
    return new Paginator<typeof params, Status[]>(
      this.http,
      '/api/v1/bookmarks',
      params,
    );
  }
}
