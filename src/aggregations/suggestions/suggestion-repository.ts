import { version } from '../../decorators';
import { Http } from '../../http';
import { Paginator } from '../../paginator';
import { DefaultPaginationParams } from '../../repository';

export class SuggestionRepository {
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
  getIterator(
    params?: DefaultPaginationParams,
  ): AsyncIterableIterator<Account[]> {
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
  remove(id: string): Promise<void> {
    return this.http.delete(`/api/v1/suggestions/${id}`);
  }
}
