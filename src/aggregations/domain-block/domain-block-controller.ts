import { version } from '../../decorators';
import { Http } from '../../http';
import { Paginator } from '../../paginator';
import { PaginationParams } from '../accounts/account-params';

export class DomainBlockController implements AsyncIterable<string[]> {
  constructor(private readonly http: Http, readonly version: string) {}

  async *[Symbol.asyncIterator]() {
    yield* this.getIterator();
  }

  /**
   * View domains the user has blocked.
   * @param params Parameters
   * @return Array of strings
   * @see https://docs.joinmastodon.org/methods/accounts/domain_blocks/
   */
  @version({ since: '1.4.0' })
  getIterator(params?: PaginationParams) {
    return new Paginator<typeof params, string[]>(
      this.http,
      `/api/v1/domain_blocks`,
      params,
    );
  }

  /**
   * Block a domain to:
   * - hide all public posts from it
   * - hide all notifications from it
   * - remove all followers from it
   * - prevent following new users from it (but does not remove existing follows)
   * @param domain Domain to block.
   * @return N/A
   * @see https://docs.joinmastodon.org/methods/accounts/domain_blocks/
   */
  @version({ since: '1.4.0' })
  block(domain: string) {
    return this.http.post<void>(`/api/v1/domain_blocks`, {
      domain,
    });
  }

  /**
   * Remove a domain block, if it exists in the user's array of blocked domains.
   * @param domain Domain to unblock
   * @return N/A
   * @see https://docs.joinmastodon.org/methods/accounts/domain_blocks/
   */
  @version({ since: '1.4.0' })
  unblock(domain: string) {
    return this.http.delete<void>(`/api/v1/domain_blocks`, {
      domain,
    });
  }
}
