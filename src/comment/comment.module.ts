import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CommentDataSourceModule } from 'src/infrastructure/repository/comment';
import { FeedDataSourceModule } from 'src/infrastructure/repository/feed';
import { UserDataSourceModule } from 'src/infrastructure/repository/user';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [
    CommentDataSourceModule,
    FeedDataSourceModule,
    UserDataSourceModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
