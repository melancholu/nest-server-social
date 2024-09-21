import { Feed } from '../dto/feed';

export const FEED_REPOSITORY = 'FEED_REPOSITORY';

export interface FeedRepository {
  getOneByUuid(uuid: string): Promise<Feed>;

  getList(take: number, skip: number): Promise<Feed[]>;

  save(feed: Feed): Promise<Feed>;
}
