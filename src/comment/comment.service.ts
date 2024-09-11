import { Inject, Injectable } from '@nestjs/common';
import {
  COMMENT_REPOSITORY,
  CommentRepository,
  CommentPagination,
} from 'src/domain/comment';
import { PAGE_NUM } from './comment.constant';

@Injectable()
export class CommentService {
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private readonly commentRepository: CommentRepository,
  ) {}

  async getList(feedUuid: string, page: number): Promise<CommentPagination> {
    const comments = await this.commentRepository.getList(
      feedUuid,
      PAGE_NUM,
      (page - 1) * PAGE_NUM,
    );

    return new CommentPagination({
      data: comments,
      meta: {
        cur_page: page,
        next_page: page + 1,
        page_num: PAGE_NUM,
      },
    });
  }
}
