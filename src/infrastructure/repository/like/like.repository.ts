import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikeEntity } from 'src/infrastructure/entity';
import { Like } from 'src/domain/dto';
import { LikeRepository } from 'src/domain/repository';

@Injectable()
export class LikeRepositorySource implements LikeRepository {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly repository: Repository<LikeEntity>,
  ) {}

  async like(like: Like): Promise<void> {
    const entity = LikeEntity.from(like);
    entity.isActive = true;

    await this.repository.upsert(entity, ['id']);
  }

  async unlike(like: Like): Promise<void> {
    await this.repository.update(like.id, { isActive: false });
  }
}
