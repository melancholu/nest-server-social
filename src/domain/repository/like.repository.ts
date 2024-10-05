import { Like } from '../dto/like';

export const LIKE_REPOSITORY = 'LIKE_REPOSITORY';

export interface LikeRepository {
  like(like: Like): Promise<void>;

  unlike(like: Like): Promise<void>;
}
