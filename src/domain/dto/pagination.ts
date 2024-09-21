export class Pagination<T> {
  readonly data: T[];

  readonly meta: {
    cur_page: number;
    next_page: number;
    page_num: number;
  };

  constructor(partial?: Partial<Pagination<T>>) {
    Object.assign(this, partial);
  }
}
