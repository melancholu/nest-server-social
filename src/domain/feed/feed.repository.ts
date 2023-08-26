import { Feed } from './feed';

export const FEED_REPOSITORY = 'feed';

export interface FeedRepository {
  getList(take: number, skip: number): Promise<Feed[]>;

  save(feed: Feed): Promise<Feed>;
}
