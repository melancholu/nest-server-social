import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';
import { User } from 'src/domain/user';

export class Feed {
  @Exclude()
  readonly id: number;

  readonly uuid: string;

  readonly user: User;

  readonly created: Date;

  @IsString()
  readonly content: string;

  constructor(partial?: Partial<Feed>) {
    Object.assign(this, partial);
  }
}
