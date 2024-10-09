import { Feed, Like, User } from '../dto';

export const LIKE_REPOSITORY = 'LIKE_REPOSITORY';

export interface LikeRepository {
  getOneByFeedAndUser(feed: Feed, user: User): Promise<Like>;

  like(like: Like): Promise<void>;
}
