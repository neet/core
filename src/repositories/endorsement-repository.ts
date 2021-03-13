import { version } from '../decorators';
import { Http } from '../http';
import { Paginator } from '../paginator';
import { DefaultPaginationParams, Repository } from '../repository';

export class EndorsementRepository implements Repository<Account> {
  constructor(private readonly http: Http, readonly version: string) {}

  async *[Symbol.asyncIterator]() {
    yield* this.getIterator();
  }

  /**
   * Accounts that the user is currently featuring on their profile.
   * @return Array of Account
   * @see https://docs.joinmastodon.org/methods/accounts/endorsements/
   */
  @version({ since: '2.5.0' })
  getIterator(params?: DefaultPaginationParams) {
    return new Paginator<typeof params, Account[]>(
      this.http,
      `/api/v1/endorsements`,
      params,
    );
  }
}
