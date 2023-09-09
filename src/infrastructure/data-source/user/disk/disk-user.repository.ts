import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/infrastructure/entity';
import { User } from 'src/domain/user';

export const ON_DISK_USER_REPOSITORY = 'on_disk_user_repository';

export interface OnDiskUserRepository {
  save(user: User): Promise<User>;

  getOneByUuid(uuid: string): Promise<User>;

  getOneByEmail(email: string): Promise<User>;

  getList(take: number, skip: number): Promise<User[]>;
}

@Injectable()
export class OnDiskUserRepositorySource implements OnDiskUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async save(user: User): Promise<User> {
    const entity = UserEntity.create(user);

    await this.repository
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values(entity)
      .execute();

    return {
      ...user,
      uuid: entity.uuid,
    };
  }

  async getOneByUuid(uuid: string): Promise<User> {
    const entity = await this.repository.findOneBy({ uuid });

    if (!entity) {
      return null;
    }

    return UserEntity.toUser(entity);
  }

  async getOneByEmail(email: string): Promise<User> {
    const entity = await this.repository.findOneBy({ email });

    if (!entity) {
      return null;
    }

    return UserEntity.toUser(entity);
  }

  async getList(take: number, skip: number): Promise<User[]> {
    const [users] = await this.repository.findAndCount({
      take,
      skip,
    });

    return users.map((userEntity: UserEntity) => UserEntity.toUser(userEntity));
  }
}
