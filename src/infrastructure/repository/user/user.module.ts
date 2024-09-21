import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { USER_REPOSITORY } from 'src/domain/repository/user.repository';
import { UserEntity } from 'src/infrastructure/entity/user.entity';
import { UserRepositorySource } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositorySource,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class UserDataSourceModule {}
