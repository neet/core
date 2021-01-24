import { deprecated, version } from '../../decorators';
import { Http } from '../../http';
import { Account } from '../accounts';
import { Card } from './card';
import { Context } from './context';
import { Status } from './status';
import type { CreateStatusParams, ReblogStatusParams } from './statuses-params';

export class StatusController {
  constructor(private readonly http: Http, readonly version: string) {}

  /**
   * View information about a status.
   * @param id Local ID of a status in the database.
   * @return Status
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  @version({ since: '0.0.0' })
  fetch(id: string) {
    return this.http.get<Status>(`/api/v1/statuses/${id}`);
  }

  /**
   * Post a new status.
   * @param params Parameters
   * @param idempotencyKey Prevent duplicate submissions of the same status. Idempotency keys are stored for up to 1 hour, and can be any arbitrary string. Consider using a hash or UUID generated client-side.
   * @return Status. When scheduled_at is present, ScheduledStatus is returned instead.
   * @see https://docs.joinmastodon.org/api/rest/statuses/#post-api-v1-statuses
   */
  @version({ since: '0.0.0' })
  create(params: CreateStatusParams, idempotencyKey?: string) {
    if (idempotencyKey) {
      return this.http.post<Status>('/api/v1/statuses', params, {
        headers: { 'Idempotency-Key': idempotencyKey },
      });
    }

    return this.http.post<Status>('/api/v1/statuses', params);
  }

  /**
   * Delete one of your own statuses.
   * @param id Local ID of a status in the database. Must be owned by authenticated account.
   * @return Status with source text and `media_attachments` or `poll`
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  @version({ since: '0.0.0' })
  remove(id: string) {
    return this.http.delete<Status>(`/api/v1/statuses/${id}`);
  }

  /**
   * View statuses above and below this status in the thread.
   * @param id Local ID of a status in the database.
   * @return Context
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  @version({ since: '0.0.0' })
  fetchContext(id: string) {
    return this.http.get<Context>(`/api/v1/statuses/${id}/context`);
  }

  /**
   * Preview card
   * @deprecated Use `card` attribute of status instead
   * @param id ID of the status in the database
   * @return Card
   * @see https://docs.joinmastodon.org/api/rest/statuses/#get-api-v1-statuses-id-card
   */
  @deprecated('Use `card` attribute of status instead')
  @version({ since: '0.0.0', until: '2.9.3' })
  fetchCard(id: string) {
    return this.http.get<Card>(`/api/v1/statuses/${id}/card`);
  }

  /**
   * Add a status to your favourites list.
   * @param id Local ID of a status in the database.
   * @return Status
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  @version({ since: '0.0.0' })
  favourite(id: string) {
    return this.http.post<Status>(`/api/v1/statuses/${id}/favourite`);
  }

  /**
   * Remove a status from your favourites list.
   * @param id Local ID of a status in the database.
   * @return Status
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  @version({ since: '0.0.0' })
  unfavourite(id: string) {
    return this.http.post<Status>(`/api/v1/statuses/${id}/unfavourite`);
  }

  /**
   * Do not receive notifications for the thread that this status is part of. Must be a thread in which you are a participant.
   * @param id Local ID of a status in the database.
   * @return Status
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  @version({ since: '1.4.2' })
  mute(id: string) {
    return this.http.post<Status>(`/api/v1/statuses/${id}/mute`);
  }

  /**
   * Start receiving notifications again for the thread that this status is part of.
   * @param id Local ID of a status in the database.
   * @return Status
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  @version({ since: '1.4.2' })
  unmute(id: string) {
    return this.http.post<Status>(`/api/v1/statuses/${id}/unmute`);
  }

  /**
   * View who boosted a given status.
   * @param id Local ID of a status in the database.
   * @return Array of Account
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  @version({ since: '0.0.0' })
  fetchRebloggedBy(id: string) {
    return this.http.get<Account[]>(`/api/v1/statuses/${id}/reblogged_by`);
  }

  /**
   * View who favourited a given status.
   * @param id Local ID of a status in the database.
   * @return Array of Account
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  @version({ since: '0.0.0' })
  fetchFavouritedBy(id: string) {
    return this.http.get<Account[]>(`/api/v1/statuses/${id}/favourited_by`);
  }

  /**
   * Re-share a status.
   * @param id Local ID of a status in the database.
   * @return Status
   * @see https://docs.joinmastodon.org/api/rest/statuses/#post-api-v1-statuses-id-reblog
   */
  @version({ since: '0.0.0' })
  reblog(id: string, params?: ReblogStatusParams) {
    return this.http.post<Status>(`/api/v1/statuses/${id}/reblog`, params);
  }

  /**
   * Undo a re-share of a status.
   * @param id Local ID of a status in the database.
   * @return Status
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  @version({ since: '0.0.0' })
  unreblog(id: string) {
    return this.http.post<Status>(`/api/v1/statuses/${id}/unreblog`);
  }

  /**
   * Feature one of your own public statuses at the top of your profile.
   * @param id Local ID of a status in the database. The status should be public and authored by the authorized account.
   * @return Status
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  @version({ since: '1.6.0' })
  pin(id: string) {
    return this.http.post<Status>(`/api/v1/statuses/${id}/pin`);
  }

  /**
   * Un-feature a status from the top of your profile.
   * @param id Local ID of a status in the database.
   * @return Status
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  @version({ since: '1.6.0' })
  unpin(id: string) {
    return this.http.post<Status>(`/api/v1/statuses/${id}/unpin`);
  }

  /**
   * Privately bookmark a status.
   * @param id ID of the status in the database
   * @return Status
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  @version({ since: '3.1.0' })
  bookmark(id: string) {
    return this.http.post<Status>(`/api/v1/statuses/${id}/bookmark`);
  }

  /**
   * Remove a status from your private bookmarks.
   * @param id ID of the status in the database
   * @return Status
   * @see https://docs.joinmastodon.org/methods/statuses/
   */
  @version({ since: '3.1.0' })
  unbookmark(id: string) {
    return this.http.post<Status>(`/api/v1/statuses/${id}/unbookmark`);
  }
}
