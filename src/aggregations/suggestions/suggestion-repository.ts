import { version } from '../../decorators';
import { Http } from '../../http';
import { Paginator } from '../../paginator';
import { DefaultPaginationParams } from '../../repository';

export class SuggestionRepository implements AsyncIterableIterator<Account[]> {
  // private readonly paginator: Paginator<DefaultPaginationParams, Account[]>;

  constructor(private readonly http: Http, readonly version: string) {}

  private readonly paginator = new Paginator<
    DefaultPaginationParams,
    Account[]
  >(this.http, '/api/v1/suggestions');

  readonly next = this.paginator.next;
  readonly throw = this.paginator.throw;
  readonly return = this.paginator.return;

  [Symbol.asyncIterator]() {
    return this;
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
