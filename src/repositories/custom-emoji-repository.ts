import { version } from '../decorators';
import { Emoji } from '../entities';
import { Http } from '../http';
import { Repository } from '../repository';

export class CustomEmojiRepository implements Repository<Emoji> {
  constructor(private readonly http: Http, readonly version: string) {}

  /**
   * Returns custom emojis that are available on the server.
   * @return Array of Emoji
   * @see https://docs.joinmastodon.org/methods/instance/custom_emojis/
   */
  @version({ since: '2.0.0' })
  fetchAll() {
    return this.http.get<Emoji[]>(`/api/v1/custom_emojis`);
  }
}
