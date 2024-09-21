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
import { Comment, Pagination, User } from 'src/domain/dto';
import { CommentService } from './comment.service';

@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/')
  async getList(
    @Query('feed') feed: string,
    @Query('page') page: number = 1,
  ): Promise<Pagination<Comment>> {
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

  @Post('/')
  async save(
    @UserInfo() userInfo: User,
    @Body() comment: Comment,
  ): Promise<Comment> {
    try {
      const result = await this.commentService.save({
        ...comment,
        user: new User({ uuid: userInfo.uuid }),
      });

      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
