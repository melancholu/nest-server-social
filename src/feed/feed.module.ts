import { Module } from '@nestjs/common';
import { FeedModule as FeedDataSourceModule } from 'src/infrastructure/data-source/feed';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';

@Module({
  imports: [FeedDataSourceModule],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
