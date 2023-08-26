import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedEntity } from 'src/infrastructure/entity';
import { Feed } from 'src/domain/feed';

export const ON_DISK_FEED_REPOSITORY = 'on_disk_feed_repository';

export interface OnDiskFeedRepository {
  getList(take: number, skip: number): Promise<Feed[]>;

  save(feed: Feed): Promise<Feed>;
}

@Injectable()
export class OnDiskFeedRepositorySource implements OnDiskFeedRepository {
  constructor(
    @InjectRepository(FeedEntity)
    private readonly repository: Repository<FeedEntity>,
  ) {}

  async getList(take: number, skip: number): Promise<Feed[]> {
    const [feeds] = await this.repository.findAndCount({
      take,
      skip,
    });

    return feeds;
  }

  async save(feed: Feed): Promise<Feed> {
    const entity = FeedEntity.create(feed);

    await this.repository
      .createQueryBuilder()
      .insert()
      .into(FeedEntity)
      .values(entity)
      .execute();

    return {
      ...feed,
      uuid: entity.uuid,
    };
  }
}
