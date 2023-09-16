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
import { Feed, FeedPagination } from 'src/domain/feed';
import { User } from 'src/domain/user';
import { FeedService } from './feed.service';

@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get('/')
  async getList(@Query('page') page = 1): Promise<FeedPagination> {
    try {
      if (Number.isNaN(page)) {
        return this.feedService.getList(1);
      }
      return this.feedService.getList(page);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/')
  async save(@Body() feed: Feed): Promise<Feed> {
    try {
      const result = await this.feedService.save({
        ...feed,
        user: new User({ name: 'test1', email: 'ehdgur0822@naver.com' }),
      });

      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
