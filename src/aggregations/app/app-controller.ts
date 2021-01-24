import { version } from '../../decorators';
import { Http } from '../../http';
import type { CreateAppParams } from './app-params';
import type { Client } from './application';

export class AppController {
  constructor(private readonly http: Http, readonly version: string) {}

  /**
   * Create a new application to obtain OAuth2 credentials.
   * @param params Parameters
   * @return Returns App with `client_id` and `client_secret`
   * @see https://docs.joinmastodon.org/methods/apps/
   */
  @version({ since: '0.0.0' })
  create(params: CreateAppParams) {
    return this.http.post<Client>(`/api/v1/apps`, params);
  }

  /**
   * Confirm that the app's OAuth2 credentials work.
   * @return Application
   * @see https://docs.joinmastodon.org/methods/apps/
   */
  @version({ since: '2.0.0' })
  verifyCredentials() {
    return this.http.get<Client>(`/api/v1/apps/verify_credentials`);
  }
}
