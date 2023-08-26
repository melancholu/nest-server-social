import { Module } from '@nestjs/common';

import { FEED_REPOSITORY } from 'src/domain/feed';
import { OnDiskFeedModule } from './disk';
import { FeedRepositorySource } from './feed.repository';

@Module({
  imports: [OnDiskFeedModule],
  providers: [
    {
      provide: FEED_REPOSITORY,
      useClass: FeedRepositorySource,
    },
  ],
  exports: [FEED_REPOSITORY],
})
export class FeedModule {}
