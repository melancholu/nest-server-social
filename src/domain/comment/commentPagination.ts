import { Comment } from './comment';

export class CommentPagination {
  readonly data: Comment[];

  readonly meta: {
    cur_page: number;
    next_page: number;
    page_num: number;
  };

  constructor(partial?: Partial<CommentPagination>) {
    Object.assign(this, partial);
  }
}
