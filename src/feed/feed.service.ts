import { Inject, Injectable } from '@nestjs/common';
import { Feed, Like, Pagination } from 'src/domain/dto';
import {
  FEED_REPOSITORY,
  FeedRepository,
  LIKE_REPOSITORY,
  LikeRepository,
  USER_REPOSITORY,
  UserRepository,
} from 'src/domain/repository';
import { PAGE_NUM } from './feed.constant';

@Injectable()
export class FeedService {
  constructor(
    @Inject(FEED_REPOSITORY)
    private readonly feedRepository: FeedRepository,
    @Inject(LIKE_REPOSITORY)
    private readonly likeRepository: LikeRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async getList(page: number, userUuid: string): Promise<Pagination<Feed>> {
    const user = await this.userRepository.getOneByUuid(userUuid);
    const feeds = await this.feedRepository.getList(
      PAGE_NUM,
      (page - 1) * PAGE_NUM,
      user.id,
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

  async like(_feed: Feed, userUuid: string): Promise<void> {
    const feed = await this.feedRepository.getOneByUuid(_feed.uuid);
    const user = await this.userRepository.getOneByUuid(userUuid);
    const prevLike = await this.likeRepository.getOneByFeedAndUser(feed, user);

    await this.likeRepository.like(
      new Like({
        feed,
        user,
        isActive: prevLike === null ? true : !prevLike.isActive,
      }),
    );
  }
}
