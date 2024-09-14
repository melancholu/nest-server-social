import { Inject, Injectable } from '@nestjs/common';
import {
  FEED_REPOSITORY,
  FeedRepository,
  Feed,
  FeedPagination,
} from 'src/domain/feed';
import { USER_REPOSITORY, UserRepository } from 'src/domain/user';
import { PAGE_NUM } from './feed.constant';

@Injectable()
export class FeedService {
  constructor(
    @Inject(FEED_REPOSITORY)
    private readonly feedRepository: FeedRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async getList(page: number): Promise<FeedPagination> {
    const feeds = await this.feedRepository.getList(
      PAGE_NUM,
      (page - 1) * PAGE_NUM,
    );

    return new FeedPagination({
      data: feeds,
      meta: {
        cur_page: page,
        next_page: page + 1,
        page_num: PAGE_NUM,
      },
    });
  }

  async save(feed: Feed): Promise<Feed> {
    const userUuid = feed.user.uuid;
    const user = await this.userRepository.getOneByUuid(userUuid);

    return this.feedRepository.save({
      ...feed,
      user,
    });
  }
}
