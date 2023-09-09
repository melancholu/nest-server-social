import { User } from './user';

export const USER_REPOSITORY = 'user_repository';

export interface UserRepository {
  save(user: User): Promise<User>;

  getOneByUuid(uuid: string): Promise<User>;

  getOneByEmail(email: string): Promise<User>;

  getList(take: number, skip: number): Promise<User[]>;
}
