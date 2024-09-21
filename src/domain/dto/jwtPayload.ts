export class JwtPayload {
  readonly uuid: string;

  constructor(partial?: Partial<JwtPayload>) {
    Object.assign(this, partial);
  }
}
