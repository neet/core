import { version } from '../../decorators/version';
import type {
  Account,
  AccountCredentials,
  FeaturedTag,
  IdentityProof,
  List,
  Relationship,
  Status,
} from '../../entities';
import { Http } from '../../http';
import { Paginator } from '../../paginator';
import { Repository } from '../../repository';
import type {
  CreateAccountNoteParams,
  CreateAccountParams,
  FetchAccountStatusesParams,
  FollowAccountParams,
  MuteAccountParams,
  PaginationParams,
  SearchAccountsParams,
  UpdateCredentialsParams,
} from './account-params';

export class AccountRepository
  implements Repository<Account, CreateAccountParams> {
  constructor(private readonly http: Http, readonly version: string) {}

  /**
   * View information about a profile.
   * @param id The id of the account in the database
   * @return Account
   * @see https://docs.joinmastodon.org/methods/accounts/
   */
  @version({ since: '0.0.0' })
  fetch(id: string): Promise<Account> {
    return this.http.get(`/api/v1/accounts/${id}`);
  }

  /**
   * Creates a user and account records. Returns an account access token
   * for the app that initiated the request. The app should save this token for later,
   * and should wait for the user to confirm their account by clicking a link in their email inbox.
   * @param params Parameters
   * @return Token
   * @see https://docs.joinmastodon.org/methods/accounts/
   */
  @version({ since: '2.7.0' })
  create(params: CreateAccountParams): Promise<Account> {
    return this.http.post(`/api/v1/accounts`, params);
  }

  /**
   * Test to make sure that the user token works.
   * @return the user's own Account with Source
   * @see https://docs.joinmastodon.org/methods/accounts/
   */
  @version({ since: '0.0.0' })
  verifyCredentials(): Promise<AccountCredentials> {
    return this.http.get('/api/v1/accounts/verify_credentials');
  }

  /**
   *  Update the user's display and preferences.
   * @param params Parameters
   * @return the user's own Account with Source
   * @see https://docs.joinmastodon.org/methods/accounts/
   */
  @version({ since: '0.0.0' })
  updateCredentials(
    params?: UpdateCredentialsParams,
  ): Promise<AccountCredentials> {
    return this.http.patch('/api/v1/accounts/update_credentials', params, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  /**
   * Accounts which follow the given account, if network is not hidden by the account owner.
   * @param id The id of the account in the database
   * @param params Parameters
   * @return Array of Account
   * @see https://docs.joinmastodon.org/methods/accounts/
   */
  @version({ since: '0.0.0' })
  getFollowersIterable(
    id: string,
    params: PaginationParams,
  ): AsyncIterable<Account[]> {
    return new Paginator<typeof params, Account[]>(
      this.http,
      `/api/v1/accounts/${id}/followers`,
      params,
    );
  }

  /**
   * Accounts which the given account is following, if network is not hidden by the account owner.
   * @param id The id of the account in the database
   * @param params Parameters
   * @return Array of Account
   * @see https://docs.joinmastodon.org/methods/accounts/
   */
  @version({ since: '0.0.0' })
  getFollowingIterable(
    id: string,
    params: PaginationParams,
  ): AsyncIterable<Account[]> {
    return new Paginator<typeof params, Account[]>(
      this.http,
      `/api/v1/accounts/${id}/following`,
      params,
    );
  }

  /**
   * Statuses posted to the given account.
   * @param id The id of the account in the database
   * @param params Parameters
   * @return Array of Status
   * @see https://docs.joinmastodon.org/methods/accounts/
   */
  @version({ since: '0.0.0' })
  getStatusesIterable(
    id: string,
    params: FetchAccountStatusesParams,
  ): AsyncIterable<Status[]> {
    return new Paginator<typeof params, Status[]>(
      this.http,
      `/api/v1/accounts/${id}/statuses`,
      params,
    );
  }

  /**
   * Follow the given account.
   * @param id The id of the account in the database
   * @param params Parameters
   * @return Relationship
   * @see https://docs.joinmastodon.org/methods/accounts/
   */
  @version({ since: '0.0.0' })
  follow(id: string, params?: FollowAccountParams): Promise<Relationship> {
    return this.http.post(`/api/v1/accounts/${id}/follow`, params);
  }

  /**
   * Unfollow the given account
   * @param id The id of the account in the database
   * @return Relationship
   * @see https://docs.joinmastodon.org/methods/accounts/
   */
  @version({ since: '0.0.0' })
  unfollow(id: string, params?: FollowAccountParams): Promise<Relationship> {
    return this.http.post(`/api/v1/accounts/${id}/unfollow`, params);
  }

  /**
   * Find out whether a given account is followed, blocked, muted, etc.
   * @param id Array of account IDs to check
   * @return Array of Relationship
   * @see https://docs.joinmastodon.org/methods/accounts/
   */
  @version({ since: '0.0.0' })
  fetchRelationships(id: string[]): Promise<Relationship[]> {
    return this.http.get('/api/v1/accounts/relationships', {
      id,
    });
  }

  /**
   * Search for matching accounts by username or display name.
   * @param params Parameters
   * @return Array of Account
   * @see https://docs.joinmastodon.org/methods/accounts/
   */
  @version({ since: '0.0.0' })
  search(params?: SearchAccountsParams): Promise<Account[]> {
    return this.http.get(`/api/v1/accounts/search`, params);
  }

  /**
   * Block the given account. Clients should filter statuses from this account if received (e.g. due to a boost in the Home timeline)
   * @param id The id of the account in the database
   * @return Relationship
   * @see https://docs.joinmastodon.org/methods/accounts/
   */
  @version({ since: '0.0.0' })
  block(id: string): Promise<Relationship> {
    return this.http.post(`/api/v1/accounts/${id}/block`);
  }

  /**
   * Unblock the given account.
   * @param id The id of the account in the database
   * @return Relationship
   * @see https://docs.joinmastodon.org/methods/accounts/
   */
  @version({ since: '0.0.0' })
  unblock(id: string): Promise<Relationship> {
    return this.http.post(`/api/v1/accounts/${id}/unblock`);
  }

  /**
   * Add the given account to the user's featured profiles. (Featured profiles are currently shown on the user's own public profile.)
   * @param id The id of the account in the database
   * @return Relationship
   * @see https://docs.joinmastodon.org/methods/accounts/
   */
  @version({ since: '2.5.0' })
  pin(id: string): Promise<Relationship> {
    return this.http.post(`/api/v1/accounts/${id}/pin`);
  }

  /**
   * Remove the given account from the user's featured profiles.
   * @param id The id of the account in the database
   * @return Relationship
   * @see https://docs.joinmastodon.org/methods/accounts/
   */
  @version({ since: '2.5.0' })
  unpin(id: string): Promise<Relationship> {
    return this.http.post(`/api/v1/accounts/${id}/unpin`);
  }

  /**
   * Fetch the list with the given ID. Used for verifying the title of a list.
   * @param id ID of the list in the database
   * @return Array of List
   * @see https://docs.joinmastodon.org/methods/timelines/lists/
   */
  @version({ since: '2.1.0' })
  fetchLists(id: string): Promise<List[]> {
    return this.http.get(`/api/v1/accounts/${id}/lists`);
  }

  /**
   * Mute the given account. Clients should filter statuses and notifications from this account, if received (e.g. due to a boost in the Home timeline).
   * @param id The id of the account in the database
   * @param params Parameter
   * @return Relationship
   * @see https://docs.joinmastodon.org/methods/accounts/
   */
  @version({ since: '0.0.0' })
  mute(id: string, params?: MuteAccountParams): Promise<Relationship> {
    return this.http.post(`/api/v1/accounts/${id}/mute`, params);
  }

  /**
   * Unmute the given account.
   * @param id The id of the account in the database
   * @return Relationship
   * @see https://docs.joinmastodon.org/methods/accounts/
   */
  @version({ since: '0.0.0' })
  unmute(id: string): Promise<Relationship> {
    return this.http.post(`/api/v1/accounts/${id}/unmute`);
  }

  /**
   * Add personal note to the account
   * @param id ID of the account
   * @param param Parameters
   * @return Relationship
   */
  @version({ since: '3.2.0' })
  createNote(
    id: string,
    params: CreateAccountNoteParams,
  ): Promise<Relationship> {
    return this.http.post(`/api/v1/accounts/${id}/note`, params);
  }

  /**
   * Get featured tag of the account
   * @param id ID of the account
   * @return FeaturedTags
   */
  @version({ since: '3.3.0' })
  fetchFeaturedTags(id: string): Promise<FeaturedTag> {
    return this.http.get(`/api/v1/accounts/${id}/featured_tags`);
  }

  /**
   * Identity proofs
   * @param id The id of the account in the database
   * @return Array of IdentityProof
   * @see https://github.com/tootsuite/mastodon/pull/10297
   */
  @version({ since: '2.8.0' })
  fetchIdentityProofs(id: string): Promise<IdentityProof> {
    return this.http.get(`/api/v1/accounts/${id}/identity_proofs`);
  }
}
