import { version } from '../../decorators';
import { Http } from '../../http';
import { Paginator } from '../../paginator';
import { PaginationParams } from '../accounts/account-params';

export class SuggestionController {
  constructor(private readonly http: Http, readonly version: string) {}

  async *[Symbol.asyncIterator]() {
    yield* this.getIterator();
  }

  /**
   * Accounts the user has had past positive interactions with, but is not yet following.
   * @param params Parameters
   * @return Array of Account
   * @see https://docs.joinmastodon.org/methods/accounts/suggestions/
   */
  @version({ since: '2.4.3' })
  getIterator(params?: PaginationParams) {
    return new Paginator<typeof params, Account[]>(
      this.http,
      '/api/v1/suggestions',
      params,
    );
  }

  /**
   * Remove an account from follow suggestions.
   * @param id id of the account in the database to be removed from suggestions
   * @return N/A
   * @see https://docs.joinmastodon.org/methods/accounts/suggestions/
   */
  @version({ since: '2.4.3' })
  remove(id: string) {
    return this.http.delete<void>(`/api/v1/suggestions/${id}`);
  }
}
