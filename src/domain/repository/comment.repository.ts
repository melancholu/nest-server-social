import { Comment } from '../dto/comment';

export const COMMENT_REPOSITORY = 'COMMENT_REPOSITORY';

export interface CommentRepository {
  getList(feedUuid: string, take: number, skip: number): Promise<Comment[]>;

  save(comment: Comment): Promise<Comment>;
}
