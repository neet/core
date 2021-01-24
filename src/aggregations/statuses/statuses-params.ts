import { Http } from '../../http';

export type StatusVisibility = 'public' | 'unlisted' | 'private' | 'direct';

export interface CreateStatusParamsBase {
  /** ID of the status being replied to, if status is a reply */
  readonly inReplyToId?: string | null;
  /** Mark status and attached media as sensitive? */
  readonly sensitive?: boolean | null;
  /** Text to be shown as a warning or subject before the actual content. Statuses are generally collapsed behind this field. */
  readonly spoilerText?: string | null;
  /** Visibility of the posted status. Enumerable oneOf public, unlisted, private, direct. */
  readonly visibility?: StatusVisibility | null;
  /** ISO 8601 Date-time at which to schedule a status. Providing this paramter will cause ScheduledStatus to be returned instead of Status. Must be at least 5 minutes in the future. */
  readonly scheduledAt?: string | null;
  /** ISO 639 language code for this status. */
  readonly language?: string | null;
}

export interface CreateStatusPollParam {
  /** Array of possible answers. If provided, `media_ids` cannot be used, and `poll[expires_in]` must be provided. */
  readonly options: string[];
  /** Duration the poll should be open, in seconds. If provided, media_ids cannot be used, and poll[options] must be provided. */
  readonly expiresIn: number;
  /** Allow multiple choices? */
  readonly multiple?: boolean | null;
  /** Hide vote counts until the poll ends? */
  readonly hideTotals?: boolean | null;
}

export interface CreateStatusParamsWithStatus extends CreateStatusParamsBase {
  /** Text content of the status. If `media_ids` is provided, this becomes optional. Attaching a `poll` is optional while `status` is provided. */
  readonly status: string;
  /** Array of Attachment ids to be attached as media. If provided, `status` becomes optional, and `poll` cannot be used. */
  readonly mediaIds?: string[] | null;
  readonly poll?: CreateStatusPollParam | null;
}

export interface CreateStatusParamsWithMediaIds extends CreateStatusParamsBase {
  /** Array of Attachment ids to be attached as media. If provided, `status` becomes optional, and `poll` cannot be used. */
  readonly mediaIds: string[] | null;
  /** Text content of the status. If `media_ids` is provided, this becomes optional. Attaching a `poll` is optional while `status` is provided. */
  readonly status?: string | null;
  readonly poll?: never;
}

export type CreateStatusParams =
  | CreateStatusParamsWithStatus
  | CreateStatusParamsWithMediaIds;

export interface ReblogStatusParams {
  /** any visibility except limited or direct (i.e. public, unlisted, private). Defaults to public. Currently unused in UI. */
  visibility: StatusVisibility;
}
