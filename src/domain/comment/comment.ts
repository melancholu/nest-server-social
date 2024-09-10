import { Feed } from 'src/domain/feed';
import { User } from 'src/domain/user';
import { IsString } from 'class-validator';

export class Comment {
  readonly uuid: string;

  readonly feed: Feed;

  readonly user: User;

  readonly created: Date;

  @IsString()
  readonly content: string;

  constructor(partial?: Partial<Comment>) {
    Object.assign(this, partial);
  }
}
