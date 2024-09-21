import { Inject, Injectable } from '@nestjs/common';
import { Feed, Pagination } from 'src/domain/dto';
import {
  FEED_REPOSITORY,
  FeedRepository,
  USER_REPOSITORY,
  UserRepository,
} from 'src/domain/repository';
import { PAGE_NUM } from './feed.constant';

@Injectable()
export class FeedService {
  constructor(
    @Inject(FEED_REPOSITORY)
    private readonly feedRepository: FeedRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async getList(page: number): Promise<Pagination<Feed>> {
    const feeds = await this.feedRepository.getList(
      PAGE_NUM,
      (page - 1) * PAGE_NUM,
    );

    return new Pagination<Feed>({
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
