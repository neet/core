import { AccountController } from './aggregations/accounts';
import { PaginationParams } from './aggregations/accounts/account-params';
import { AnnouncementRepository } from './aggregations/announcements/announcement-repository';
import { AppController } from './aggregations/apps/app-repository';
import { BlockController } from './aggregations/blocks/block-controller';
import { BookmarkController } from './aggregations/bookmarks/bookmark-repository';
import { ConversationRepository } from './aggregations/conversations/conversation-repository';
import { CustomEmojiController } from './aggregations/custom-emojis/custom-emoji-repository';
import { DirectoryRepository } from './aggregations/directory/directory-repository';
import { DomainBlockController } from './aggregations/domain-block/domain-block-repository';
import { EndorsementsController } from './aggregations/endorsements/endorsement-repository';
import { FavouritesController } from './aggregations/favourites/favourite-repository';
import { FeaturedTagRepository } from './aggregations/featured-tags/featured-tag-repository';
import { FilterController } from './aggregations/filters/filter-repository';
import { FollowRequestController } from './aggregations/follow-requests/follow-request-repository';
import { InstanceController } from './aggregations/instances/instance-repository';
import { ListController } from './aggregations/lists/list-repository';
import { MarkerRepository } from './aggregations/markers/marker-repository';
import { MediaAttachmentController } from './aggregations/media-attachments/media-attachment-controller';
import { MuteController } from './aggregations/mutes/mute-repository';
import { NotificationsController } from './aggregations/notifications/notification-repository';
import { PollController } from './aggregations/polls/poll-repository';
import { PreferenceRepository } from './aggregations/preferences/preferences-repository';
import { PushController } from './aggregations/push-subscriptions/push-subscription-repository';
import { ReportRepository } from './aggregations/reports/report-repository';
import { ScheduledStatusesRepository } from './aggregations/scheduled-statuses/scheduled-statuses-repository';
import { Status } from './aggregations/statuses/status';
import { StatusController } from './aggregations/statuses/status-controller';
import { SuggestionController } from './aggregations/suggestions/suggestion-controller';
import { Tag } from './aggregations/tag/tag';
import { TimelinesController } from './aggregations/timelines/timelines-controller';
import { TrendRepository } from './aggregations/trends/trend-repository';
import { version } from './decorators';
import { Http } from './http';
import { Paginator } from './paginator';

export type SearchType = 'accounts' | 'hashtags' | 'statuses';

export interface SearchParams extends PaginationParams {
  /** Attempt WebFinger lookup. Defaults to false. */
  readonly q: string;
  /** Enum(accounts, hashtags, statuses) */
  readonly type?: SearchType | null;
  /** Attempt WebFinger look-up */
  readonly resolve?: boolean | null;
  /** If provided, statuses returned will be authored only by this account */
  readonly accountId?: string | null;
  /** Filter out unreviewed tags? Defaults to false. Use true when trying to find trending tags. */
  readonly excludeUnreviewed?: boolean | null;
  /** Only include accounts that the user is following. Defaults to false. */
  readonly following?: boolean | null;
}

/**
 * Represents the results of a search.
 * @see https://docs.joinmastodon.org/entities/results/
 */
export interface Results {
  /** Accounts which match the given query */
  accounts: Account[];
  /** Statuses which match the given query */
  statuses: Status[];
  /** Hashtags which match the given query */
  hashtags: Tag[];
}

class Masto {
  static async login() {
    const http = ({} as unknown) as Http;
    const version = '1.0.0';
    return new Masto(http, version);
  }

  private constructor(readonly http: Http, readonly version: string) {}

  readonly accounts = new AccountController(this.http, this.version);
  readonly announcements = new AnnouncementRepository(this.http, this.version);
  readonly apps = new AppController(this.http, this.version);
  readonly blocks = new BlockController(this.http, this.version);
  readonly bookmarks = new BookmarkController(this.http, this.version);
  readonly conversations = new ConversationRepository(this.http, this.version);
  readonly customEmojis = new CustomEmojiController(this.http, this.version);
  readonly directory = new DirectoryRepository(this.http, this.version);
  readonly domainBlocks = new DomainBlockController(this.http, this.version);
  readonly endorsements = new EndorsementsController(this.http, this.version);
  readonly favourites = new FavouritesController(this.http, this.version);
  readonly featuredTags = new FeaturedTagRepository(this.http, this.version);
  readonly filters = new FilterController(this.http, this.version);
  readonly followRequests = new FollowRequestController(
    this.http,
    this.version,
  );
  readonly instances = new InstanceController(this.http, this.version);
  readonly lists = new ListController(this.http, this.version);
  readonly markers = new MarkerRepository(this.http, this.version);
  readonly mediaAttachments = new MediaAttachmentController(
    this.http,
    this.version,
  );
  readonly mutes = new MuteController(this.http, this.version);
  readonly notifications = new NotificationsController(this.http, this.version);
  readonly poll = new PollController(this.http, this.version);
  readonly preferences = new PreferenceRepository(this.http, this.version);
  readonly push = new PushController(this.http, this.version);
  readonly reports = new ReportRepository(this.http, this.version);
  readonly scheduledStatuses = new ScheduledStatusesRepository(
    this.http,
    this.version,
  );
  readonly statuses = new StatusController(this.http, this.version);
  readonly suggestions = new SuggestionController(this.http, this.version);
  readonly timelines = new TimelinesController(this.http, this.version);
  readonly trends = new TrendRepository(this.http, this.version);

  /**
   * Search results
   * @param params Parameters
   * @return Results
   * @see https://docs.joinmastodon.org/methods/search/
   */
  @version({ since: '2.4.1' })
  search(params: SearchParams) {
    return new Paginator<typeof params, Results>(
      this.http,
      `/api/v2/search`,
      params,
    );
  }
}

const main = async () => {
  const masto = await Masto.login();
  const prefe = await masto.preferences.fetch();
};
