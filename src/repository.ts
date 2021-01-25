export interface DefaultPaginationParams {
  /** **Internal parameter.** Use HTTP Link header from response for pagination. */
  readonly maxId?: string | null;
  /** **Internal parameter.** Use HTTP Link header from response for pagination. */
  readonly sinceId?: string | null;
  /** Get a list of items with ID greater than this value excluding this ID */
  readonly minId?: string | null;
  /** Maximum number of results to return per page. Defaults to 40. NOTE: Pagination is done with the Link header from the response. */
  readonly limit?: number | null;
}

export interface Repository<
  Entity,
  CreateParams = never,
  UpdateParams = never,
  FetchParams = never,
  PaginationParams = DefaultPaginationParams
> {
  [Symbol.asyncIterator]?(): AsyncIterable<Entity[]>;
  fetch?(id: string): Promise<Entity>;
  fetchAll?(params?: FetchParams): Promise<Entity[]>;
  create?(params: CreateParams): Promise<Entity>;
  update?(...args: unknown[]): Promise<Entity>;
  delete?(id: string): Promise<void>;
  getIterator?(params: PaginationParams): AsyncIterable<Entity[]>;
}
