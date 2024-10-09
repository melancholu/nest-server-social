import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikeEntity } from 'src/infrastructure/entity';
import { Feed, Like, User } from 'src/domain/dto';
import { LikeRepository } from 'src/domain/repository';

@Injectable()
export class LikeRepositorySource implements LikeRepository {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly repository: Repository<LikeEntity>,
  ) {}

  async getOneByFeedAndUser(feed: Feed, user: User): Promise<Like> {
    const entity = await this.repository.findOneBy({ feed, user });

    if (!entity) {
      return null;
    }

    return LikeEntity.to(entity);
  }

  async like(like: Like): Promise<void> {
    const entity = LikeEntity.from(like);

    await this.repository.upsert(entity, ['feed', 'user']);
  }
}
