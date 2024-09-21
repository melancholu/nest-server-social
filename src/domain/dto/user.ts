import { Exclude } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class User {
  @Exclude()
  readonly id: number;

  readonly uuid: string;

  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @Exclude({ toPlainOnly: true })
  readonly password: string;

  readonly imageUrl: string;

  readonly created: Date;

  @Exclude({ toPlainOnly: true })
  readonly refreshToken: string;

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}
