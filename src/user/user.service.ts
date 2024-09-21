import { Inject, Injectable } from '@nestjs/common';
import { User, Pagination } from 'src/domain/dto';
import { USER_REPOSITORY, UserRepository } from 'src/domain/repository';
import { PAGE_NUM } from './user.constant';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  getOneByUuid(uuid: string): Promise<User> {
    return this.userRepository.getOneByUuid(uuid);
  }

  async getList(page: number): Promise<Pagination<User>> {
    const feeds = await this.userRepository.getList(
      PAGE_NUM,
      (page - 1) * PAGE_NUM,
    );

    return new Pagination<User>({
      data: feeds,
      meta: {
        cur_page: page,
        next_page: page + 1,
        page_num: PAGE_NUM,
      },
    });
  }
}
