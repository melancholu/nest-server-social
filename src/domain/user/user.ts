import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class User {
  readonly uuid: string;

  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @Exclude({ toPlainOnly: true })
  readonly password: string;

  readonly imageUrl: string;

  readonly created: string;

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}
