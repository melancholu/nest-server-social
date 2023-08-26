import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Feed, FeedPagination } from 'src/domain/feed';
import { FeedService } from './feed.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get('/')
  async getList(@Query('page') page = 1): Promise<FeedPagination> {
    try {
      return this.feedService.getList(page);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/')
  async save(@Body() feed: Feed): Promise<Feed> {
    try {
      const result = await this.feedService.save(feed);

      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
