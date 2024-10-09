import { Exclude } from 'class-transformer';
import { Feed, User } from 'src/domain/dto';

export class Like {
  @Exclude()
  readonly id: number;

  readonly uuid: string;

  readonly feed: Feed;

  readonly user: User;

  readonly created: Date;

  @Exclude()
  readonly isActive: boolean;

  constructor(partial?: Partial<Like>) {
    Object.assign(this, partial);
  }
}
