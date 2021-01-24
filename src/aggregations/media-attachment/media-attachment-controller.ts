import semver from 'semver';

import { version } from '../../decorators';
import { Http } from '../../http';
import { Attachment } from './attachment';

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

export class MediaAttachmentController {
  constructor(private readonly http: Http, readonly version: string) {}

  /**
   * Creates an attachment to be used with a new status.
   * @param params Parameters
   * @return Attachment
   * @see https://docs.joinmastodon.org/methods/statuses/media/
   */
  @version({ since: '0.0.0' })
  createMediaAttachment(params: CreateMediaAttachmentParams) {
    const v = semver.gt(this.version, '3.1.3', { loose: true }) ? 'v2' : 'v1';
    return this.http.post<Attachment>(`/api/${v}/media`, params, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  /**
   * Fetches an attachment to be used with a new status.
   * @param id ID of the attachment
   * @see https://github.com/tootsuite/mastodon/pull/13210
   */
  @version({ since: '3.1.3' })
  fetchMediaAttachment(id: string) {
    return this.http.get<Attachment>(`/api/v1/media/${id}`);
  }

  /**
   * Update an Attachment, before it is attached to a status and posted.
   * @param id The id of the Attachment entity to be updated
   * @param params Parameters
   * @return Attachment
   * @see https://docs.joinmastodon.org/api/rest/media/#put-api-v1-media-id
   */
  @version({ since: '0.0.0' })
  updateMediaAttachment(id: string, params: UpdateMediaAttachmentParams) {
    return this.http.put<Attachment>(`/api/v1/media/${id}`, params);
  }
}
