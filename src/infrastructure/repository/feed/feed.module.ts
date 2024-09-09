import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FEED_REPOSITORY } from 'src/domain/feed/feed.repository';
import { FeedEntity } from 'src/infrastructure/entity/feed.entity';
import { FeedRepositorySource } from './feed.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FeedEntity])],
  providers: [
    {
      provide: FEED_REPOSITORY,
      useClass: FeedRepositorySource,
    },
  ],
  exports: [FEED_REPOSITORY],
})
export class FeedDataSourceModule {}
