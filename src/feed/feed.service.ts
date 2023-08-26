import { Inject, Injectable } from '@nestjs/common';
import {
  FEED_REPOSITORY,
  FeedRepository,
  Feed,
  FeedPagination,
} from 'src/domain/feed';
import { PAGE_NUM } from './feed.constant';

@Injectable()
export class FeedService {
  constructor(
    @Inject(FEED_REPOSITORY)
    private readonly feedRepository: FeedRepository,
  ) {}

  async getList(page: number): Promise<FeedPagination> {
    const feeds = await this.feedRepository.getList(
      PAGE_NUM,
      (page - 1) * PAGE_NUM,
    );

    return {
      data: feeds,
      meta: {
        cur_page: page,
        next_page: page + 1,
        page_num: PAGE_NUM,
      },
    };
  }

  save(feed: Feed): Promise<Feed> {
    return this.feedRepository.save(feed);
  }
}
