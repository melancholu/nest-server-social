import { User } from 'src/domain/user';

export class Feed {
  readonly uuid: string;

  readonly user: User;

  readonly created: Date;

  readonly content: string;

  constructor(partial?: Partial<Feed>) {
    Object.assign(this, partial);
  }
}
