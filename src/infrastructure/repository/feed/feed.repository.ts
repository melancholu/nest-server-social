import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedEntity, LikeEntity } from 'src/infrastructure/entity';
import { Feed, User } from 'src/domain/dto';
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

  async getList(take: number, skip: number, userId?: number): Promise<Feed[]> {
    const feeds = await this.repository
      .createQueryBuilder('feed')
      .leftJoinAndSelect('feed.user', 'user')
      .leftJoin(
        LikeEntity,
        'like',
        'like.feed_id = feed.id AND like.is_active = True',
      )
      .addSelect('COUNT(like.id)::INTEGER', 'likes')
      .addSelect(
        `EXISTS (
          SELECT 1
          FROM "like" l
          WHERE l.feed_id = feed.id AND l.user_id = :userId AND l.is_active = true
        )`,
        'liked',
      )
      .groupBy('feed.id')
      .addGroupBy('user.id')
      .setParameter('userId', userId)
      .skip(skip)
      .take(take)
      .getRawAndEntities();

    return feeds.raw.map((feed) => {
      return {
        id: feed.feed_id,
        uuid: feed.feed_uuid,
        user: new User({
          id: feed.user_id,
          uuid: feed.user_uuid,
          name: feed.user_name,
          email: feed.user_email,
          imageUrl: feed.user_image_url,
          created: feed.user_created,
        }),
        content: feed.feed_content,
        created: feed.feed_created,
        likes: feed.likes,
        liked: feed.liked,
      };
    });
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
