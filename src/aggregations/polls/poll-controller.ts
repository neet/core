import { version } from '../../decorators';
import { Http } from '../../http';
import { Poll } from './poll';

export interface VotePollParams {
  /** Array of own votes containing index for each option (starting from 0) */
  readonly choices: string[];
}

export class PollController {
  constructor(private readonly http: Http, readonly version: string) {}
  /**
   * View a poll
   * @param id ID of the poll in the database
   * @return Poll
   * @see https://docs.joinmastodon.org/methods/statuses/polls/
   */
  @version({ since: '2.8.0' })
  fetchPoll(id: string) {
    return this.http.get<Poll>(`/api/v1/polls/${id}`);
  }

  /**
   * Vote on a poll
   * @param id ID of the poll in the database
   * @param params Parameters
   * @return Poll
   * @see https://docs.joinmastodon.org/methods/statuses/polls/
   */
  @version({ since: '2.8.0' })
  votePoll(id: string, params: VotePollParams) {
    return this.http.post<Poll>(`/api/v1/polls/${id}/votes`, params);
  }
}
