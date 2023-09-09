import { User } from './user';

export class UserPagination {
  readonly data: User[];

  readonly meta: {
    cur_page: number;
    next_page: number;
    page_num: number;
  };

  constructor(partial?: Partial<UserPagination>) {
    Object.assign(this, partial);
  }
}
