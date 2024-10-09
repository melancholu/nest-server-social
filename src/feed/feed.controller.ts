import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/core/decorator/user.decorator';
import { Feed, Like, Pagination, User } from 'src/domain/dto';
import { FeedService } from './feed.service';

@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get('/')
  async getList(
    @UserInfo() userInfo: User,
    @Query('page') page: number = 1,
  ): Promise<Pagination<Feed>> {
    try {
      if (Number.isNaN(page)) {
        return this.feedService.getList(1, userInfo.uuid);
      }
      return this.feedService.getList(page, userInfo.uuid);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/')
  async save(@UserInfo() userInfo: User, @Body() feed: Feed): Promise<Feed> {
    try {
      const result = await this.feedService.save({
        ...feed,
        user: new User({ uuid: userInfo.uuid }),
      });

      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('like')
  async like(@UserInfo() userInfo: User, @Body() feed: Feed): Promise<void> {
    try {
      await this.feedService.like(feed, userInfo.uuid);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
