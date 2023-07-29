import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository, User } from 'src/domain/user';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  getOneByUuid(uuid: string): Promise<User> {
    return this.userRepository.getOneByUuid(uuid);
  }

  getOneByEmail(email: string): Promise<User> {
    return this.userRepository.getOneByEmail(email);
  }
}
