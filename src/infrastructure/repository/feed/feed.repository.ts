import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedEntity } from 'src/infrastructure/entity';
import { Feed } from 'src/domain/dto';
import { FeedRepository } from 'src/domain/repository';

@Injectable()
export class FeedRepositorySource implements FeedRepository {
  constructor(
    @InjectRepository(FeedEntity)
    private readonly repository: Repository<FeedEntity>,
  ) {}

  async getOneByUuid(uuid: string): Promise<Feed> {
    const entity = await this.repository.findOneBy({ uuid });

    if (!entity) {
      return null;
    }

    return FeedEntity.to(entity);
  }

  async getList(take: number, skip: number): Promise<Feed[]> {
    const [feeds] = await this.repository.findAndCount({
      relations: {
        user: true,
      },
      take,
      skip,
    });

    return feeds;
  }

  async save(feed: Feed): Promise<Feed> {
    const entity = FeedEntity.from(feed);

    const result = await this.repository
      .createQueryBuilder()
      .insert()
      .into(FeedEntity)
      .values(entity)
      .returning('uuid')
      .execute();

    return {
      ...feed,
      uuid: result.raw[0].uuid,
    };
  }
}
