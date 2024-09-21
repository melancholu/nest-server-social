import { Feed, User } from 'src/domain/dto';
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
