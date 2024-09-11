import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CommentDataSourceModule } from 'src/infrastructure/repository/comment';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [
    CommentDataSourceModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
