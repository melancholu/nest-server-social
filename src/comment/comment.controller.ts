import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentPagination } from 'src/domain/comment';
import { CommentService } from './comment.service';

@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('feed')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/')
  async getList(
    @Query('feed') feed: string,
    @Query('page') page: number = 1,
  ): Promise<CommentPagination> {
    try {
      if (feed === undefined) {
        throw new Error('feed is required');
      }
      if (Number.isNaN(page)) {
        return this.commentService.getList(feed, 1);
      }

      return this.commentService.getList(feed, page);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
