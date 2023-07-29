import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from 'src/infrastructure/entity';
import {
  OnDiskUserRepositorySource,
  ON_DISK_USER_REPOSITORY,
} from './disk-user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: ON_DISK_USER_REPOSITORY,
      useClass: OnDiskUserRepositorySource,
    },
  ],
  exports: [ON_DISK_USER_REPOSITORY],
})
export class OnDiskUserModule {}
