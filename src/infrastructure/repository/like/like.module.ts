import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LIKE_REPOSITORY } from 'src/domain/repository/like.repository';
import { LikeEntity } from 'src/infrastructure/entity/like.entity';
import { LikeRepositorySource } from './like.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity])],
  providers: [
    {
      provide: LIKE_REPOSITORY,
      useClass: LikeRepositorySource,
    },
  ],
  exports: [LIKE_REPOSITORY],
})
export class LikeDataSourceModule {}
