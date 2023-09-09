import { User } from 'src/domain/user';
import { IsString } from 'class-validator';

export class Feed {
  readonly uuid: string;

  readonly user: User;

  readonly created: Date;

  @IsString()
  readonly content: string;

  constructor(partial?: Partial<Feed>) {
    Object.assign(this, partial);
  }
}
