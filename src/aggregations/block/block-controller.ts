import { version } from '../../decorators';
import { Http } from '../../http';
import { Paginator } from '../../paginator';
import { Account } from '../accounts';
import { PaginationParams } from '../accounts/account-params';

export class BlockController {
  constructor(private readonly http: Http, readonly version: string) {}

  [Symbol.asyncIterator] = this.getIterator();

  /**
   * Blocked users
   * @param params Array of Account
   * @return Query parameter
   * @see https://docs.joinmastodon.org/methods/accounts/blocks/
   */
  @version({ since: '0.0.0' })
  getIterator(params?: PaginationParams) {
    return new Paginator<typeof params, Account[]>(
      this.http,
      `/api/v1/blocks`,
      params,
    );
  }
}
