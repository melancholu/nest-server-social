export class Token {
  readonly accessToken: string;

  readonly refreshToken: string;

  constructor(partial?: Partial<Token>) {
    Object.assign(this, partial);
  }
}
