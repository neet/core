import { AccountController } from './aggregations/accounts';
import { AppController } from './aggregations/app/app-controller';
import { BlockController } from './aggregations/block/block-controller';
import { BookmarkController } from './aggregations/bookmark/bookmark-controller';
import { CustomEmojiController } from './aggregations/custom-emoji/custom-emoji-controller';
import { DomainBlockController } from './aggregations/domain-block/domain-block-controller';
import { EndorsementsController } from './aggregations/endorsements/endorsements-controller';
import { FavouritesController } from './aggregations/favourites/favourites-controller';
import { FilterController } from './aggregations/filter/filter-controller';
import { FollowRequestController } from './aggregations/follow-request/follow-request-controller';
import { InstanceController } from './aggregations/instance/instance-controller';
import { ListController } from './aggregations/list/list-controller';
import { MediaAttachmentController } from './aggregations/media-attachment/media-attachment-controller';
import { MuteController } from './aggregations/mutes/mute-controller';
import { NotificationsController } from './aggregations/notifications/notifications-controller';
import { PollController } from './aggregations/polls/poll-controller';
import { PushController } from './aggregations/push/push-controller';
import { StatusController } from './aggregations/statuses/status-controller';
import { TimelinesController } from './aggregations/timelines/timelines-controller';
import { Http } from './http';

class Masto {
  static async login() {
    const http = ({} as unknown) as Http;
    const version = '1.0.0';
    return new Masto(http, version);
  }

  private constructor(readonly http: Http, readonly version: string) {}

  accounts = new AccountController(this.http, this.version);
  apps = new AppController(this.http, this.version);
  blocks = new BlockController(this.http, this.version);
  bookmarks = new BookmarkController(this.http, this.version);
  customEmojis = new CustomEmojiController(this.http, this.version);
  domainBlocks = new DomainBlockController(this.http, this.version);
  endorsements = new EndorsementsController(this.http, this.version);
  favourites = new FavouritesController(this.http, this.version);
  filters = new FilterController(this.http, this.version);
  followRequests = new FollowRequestController(this.http, this.version);
  instances = new InstanceController(this.http, this.version);
  lists = new ListController(this.http, this.version);
  mediaAttachments = new MediaAttachmentController(this.http, this.version);
  mutes = new MuteController(this.http, this.version);
  notifications = new NotificationsController(this.http, this.version);
  push = new PushController(this.http, this.version);
  poll = new PollController(this.http, this.version);
  statuses = new StatusController(this.http, this.version);
  timelines = new TimelinesController(this.http, this.version);
}

const main = async () => {
  const masto = await Masto.login();
};
