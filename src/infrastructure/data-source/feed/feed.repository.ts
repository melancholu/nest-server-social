import { Inject, Injectable } from '@nestjs/common';
import { FeedRepository, Feed } from 'src/domain/feed';
import { OnDiskFeedRepository, ON_DISK_FEED_REPOSITORY } from './disk';

@Injectable()
export class FeedRepositorySource implements FeedRepository {
  constructor(
    @Inject(ON_DISK_FEED_REPOSITORY)
    private readonly onDiskFeedRepository: OnDiskFeedRepository,
  ) {}

  getList(take: number, skip: number): Promise<Feed[]> {
    return this.onDiskFeedRepository.getList(take, skip);
  }

  save(feed: Feed): Promise<Feed> {
    return this.onDiskFeedRepository.save(feed);
  }
}
