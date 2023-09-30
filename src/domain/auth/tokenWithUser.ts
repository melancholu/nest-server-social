import { User } from '../user';

import { Token } from './token';

export class TokenWithUser extends Token {
  readonly user: User;
}
