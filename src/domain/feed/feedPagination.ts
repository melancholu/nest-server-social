import { Feed } from './feed';

export class FeedPagination {
  readonly data: Feed[];

  readonly meta: {
    cur_page: number;
    next_page: number;
    page_num: number;
  };

  constructor(partial?: Partial<FeedPagination>) {
    Object.assign(this, partial);
  }
}
