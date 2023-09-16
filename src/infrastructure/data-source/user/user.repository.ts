import { Inject, Injectable } from '@nestjs/common';
import { UserRepository, User } from 'src/domain/user';
import { OnDiskUserRepository, ON_DISK_USER_REPOSITORY } from './disk';

@Injectable()
export class UserRepositorySource implements UserRepository {
  constructor(
    @Inject(ON_DISK_USER_REPOSITORY)
    private readonly onDiskUserRepository: OnDiskUserRepository,
  ) {}

  save(user: User): Promise<User> {
    return this.onDiskUserRepository.save(user);
  }

  getOneByUuid(uuid: string): Promise<User> {
    return this.onDiskUserRepository.getOneByUuid(uuid);
  }

  getOneByEmail(email: string): Promise<User> {
    return this.onDiskUserRepository.getOneByEmail(email);
  }

  getList(take: number, skip: number): Promise<User[]> {
    return this.onDiskUserRepository.getList(take, skip);
  }

  updateRefreshToken(uuid: string, refreshToken: string): Promise<void> {
    return this.onDiskUserRepository.updateRefreshToken(uuid, refreshToken);
  }
}
