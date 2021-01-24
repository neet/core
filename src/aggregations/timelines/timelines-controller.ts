import { deprecated, version } from '../../decorators';
import { Http } from '../../http';
import { Paginator } from '../../paginator';
import { Status } from '../statuses/status';
import { FetchTimelineParams } from './timeline-params';

export class TimelinesController {
  readonly home: AsyncIterable<Status[]>;
  readonly public: AsyncIterable<Status[]>;
  readonly direct: AsyncIterable<Status[]>;

  constructor(private readonly http: Http, readonly version: string) {
    this.home = this.getHome();
    this.public = this.getPublic();
    this.direct = this.getDirect();
  }

  /**
   * View statuses from followed users.
   * @param params Parameters
   * @return Array of Status
   * @see https://docs.joinmastodon.org/methods/timelines/
   */
  @version({ since: '0.0.0' })
  getHome(params?: FetchTimelineParams) {
    return new Paginator<typeof params, Status[]>(
      this.http,
      '/api/v1/timelines/home',
      params,
    );
  }

  /**
   * Public timeline
   * @param params Parameters
   * @return Array of Status
   * @see https://docs.joinmastodon.org/methods/timelines/
   */
  @version({ since: '0.0.0' })
  getPublic(params?: FetchTimelineParams) {
    return new Paginator<typeof params, Status[]>(
      this.http,
      '/api/v1/timelines/public',
      params,
    );
  }

  /**
   * View public statuses containing the given hashtag.
   * @param hashtag Content of a #hashtag, not including # symbol.
   * @param params Parameters
   * @return Array of Status
   * @see https://docs.joinmastodon.org/methods/timelines/
   */
  @version({ since: '0.0.0' })
  getTag(hashtag: string, params?: FetchTimelineParams) {
    return new Paginator<typeof params, Status[]>(
      this.http,
      `/api/v1/timelines/tag/${hashtag}`,
      params,
    );
  }

  /**
   * View statuses in the given list timeline.
   * @param id Local ID of the list in the database.
   * @param params Query parameter
   * @return Array of Status
   * @see https://docs.joinmastodon.org/methods/timelines/
   */
  @version({ since: '2.1.0' })
  getList(id: string, params?: FetchTimelineParams) {
    return new Paginator<typeof params, Status[]>(
      this.http,
      `/api/v1/timelines/list/${id}`,
      params,
    );
  }

  /**
   * View statuses with a “direct” privacy, from your account or in your notifications.
   * @deprecated Use conversations API instead
   * @return Array of Status
   * @see https://docs.joinmastodon.org/methods/timelines/
   */
  @deprecated('Use conversations API instead')
  @version({ since: '0.0.0', until: '2.9.3' })
  getDirect(params?: FetchTimelineParams) {
    return new Paginator<typeof params, Status[]>(
      this.http,
      '/api/v1/timelines/direct',
      params,
    );
  }
}
