import { Feed } from './feed';

export const FEED_REPOSITORY = 'FEED_REPOSITORY';

export interface FeedRepository {
  getList(take: number, skip: number): Promise<Feed[]>;

  save(feed: Feed): Promise<Feed>;
}
