import { version } from '../../decorators';
import { Http } from '../../http';
import { Paginator } from '../../paginator';
import { PaginationParams } from '../accounts/account-params';
import { Status } from '../statuses/status';

export class BookmarkController implements AsyncIterable<Status[]> {
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
  getIterator(params?: PaginationParams) {
    return new Paginator<typeof params, Status[]>(
      this.http,
      '/api/v1/bookmarks',
      params,
    );
  }
}
