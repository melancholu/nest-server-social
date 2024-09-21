import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/infrastructure/entity';
import { User } from 'src/domain/dto';
import { UserRepository } from 'src/domain/repository';

@Injectable()
export class UserRepositorySource implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async save(user: User): Promise<User> {
    const entity = UserEntity.from(user);

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

    return UserEntity.to(entity);
  }

  async getOneByEmail(email: string): Promise<User> {
    const entity = await this.repository.findOne({
      select: [
        'id',
        'uuid',
        'name',
        'email',
        'password',
        'created',
        'imageUrl',
      ],
      where: { email },
    });

    if (!entity) {
      return null;
    }

    return UserEntity.to(entity);
  }

  async getList(take: number, skip: number): Promise<User[]> {
    const [users] = await this.repository.findAndCount({
      take,
      skip,
    });

    return users.map((userEntity: UserEntity) => UserEntity.to(userEntity));
  }

  async updateRefreshToken(uuid: string, refreshToken: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update(UserEntity)
      .set({ refreshToken })
      .where('uuid = :uuid', { uuid })
      .execute();
  }
}
