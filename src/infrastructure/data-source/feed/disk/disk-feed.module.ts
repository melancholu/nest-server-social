import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FeedEntity } from 'src/infrastructure/entity';
import {
  OnDiskFeedRepositorySource,
  ON_DISK_FEED_REPOSITORY,
} from './disk-feed.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FeedEntity])],
  providers: [
    {
      provide: ON_DISK_FEED_REPOSITORY,
      useClass: OnDiskFeedRepositorySource,
    },
  ],
  exports: [ON_DISK_FEED_REPOSITORY],
})
export class OnDiskFeedModule {}
