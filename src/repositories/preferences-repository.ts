import { version } from '../decorators';
import { Preference } from '../entities';
import { Http } from '../http';
import { Repository } from '../repository';

export class PreferenceRepository implements Repository<Preference> {
  constructor(private readonly http: Http, readonly version: string) {}

  /**
   * Preferences defined by the user in their account settings.
   * @return Preferences by key and value
   * @see https://docs.joinmastodon.org/methods/accounts/preferences/
   */
  @version({ since: '2.8.0' })
  fetch() {
    return this.http.get<Preference>('/api/v1/preferences');
  }
}
