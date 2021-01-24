import { Paginator } from 'src/paginator';

import { version } from '../../decorators';
import { Http } from '../../http';
import { Account } from '../accounts';
import { PaginationParams } from '../accounts/account-params';

export interface CreateMediaAttachmentParams {
  /** The file to be attached, using multipart form data. */
  file: unknown;
  /** A plain-text description of the media, for accessibility purposes. */
  description?: string | null;
  /** Two floating points (x,y), comma-delimited, ranging from -1.0 to 1.0 */
  focus?: string | null;
  /** Custom thumbnail */
  thumbnail?: unknown | null;
}

export type UpdateMediaAttachmentParams = Partial<CreateMediaAttachmentParams>;

export class MuteController implements AsyncIterable<Account[]> {
  constructor(private readonly http: Http, readonly version: string) {}

  async *[Symbol.asyncIterator]() {
    yield* this.getIterator();
  }

  /**
   * Accounts the user has muted.
   * @param params Parameters
   * @return Array of Account
   * @see https://docs.joinmastodon.org/methods/accounts/mutes/
   */
  @version({ since: '0.0.0' })
  getIterator(params?: PaginationParams) {
    return new Paginator<typeof params, Account[]>(
      this.http,
      '/api/v1/mutes',
      params,
    );
  }
}
