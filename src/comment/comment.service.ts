import { Inject, Injectable } from '@nestjs/common';
import { Comment, Pagination } from 'src/domain/dto';
import {
  COMMENT_REPOSITORY,
  CommentRepository,
  FEED_REPOSITORY,
  FeedRepository,
  USER_REPOSITORY,
  UserRepository,
} from 'src/domain/repository';
import { PAGE_NUM } from './comment.constant';

@Injectable()
export class CommentService {
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private readonly commentRepository: CommentRepository,
    @Inject(FEED_REPOSITORY)
    private readonly feedRepository: FeedRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async getList(feedUuid: string, page: number): Promise<Pagination<Comment>> {
    const comments = await this.commentRepository.getList(
      feedUuid,
      PAGE_NUM,
      (page - 1) * PAGE_NUM,
    );

    return new Pagination<Comment>({
      data: comments,
      meta: {
        cur_page: page,
        next_page: page + 1,
        page_num: PAGE_NUM,
      },
    });
  }

  async save(comment: Comment): Promise<Comment> {
    const feedUuid = comment.feed.uuid;
    const feed = await this.feedRepository.getOneByUuid(feedUuid);
    const userUuid = comment.user.uuid;
    const user = await this.userRepository.getOneByUuid(userUuid);

    return this.commentRepository.save({
      ...comment,
      feed,
      user,
    });
  }
}
