import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { COMMENT_REPOSITORY } from 'src/domain/comment/comment.repository';
import { CommentEntity } from 'src/infrastructure/entity/comment.entity';
import { CommentRepositorySource } from './comment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  providers: [
    {
      provide: COMMENT_REPOSITORY,
      useClass: CommentRepositorySource,
    },
  ],
  exports: [COMMENT_REPOSITORY],
})
export class CommentDataSourceModule {}
