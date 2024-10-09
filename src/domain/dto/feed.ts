import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';
import { User } from 'src/domain/dto';

export class Feed {
  @Exclude()
  readonly id: number;

  readonly uuid: string;

  readonly user: User;

  readonly created: Date;

  readonly likes: number;

  readonly liked: boolean;

  @IsString()
  readonly content: string;

  constructor(partial?: Partial<Feed>) {
    Object.assign(this, partial);
  }
}
