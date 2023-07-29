import { Module } from '@nestjs/common';

import { USER_REPOSITORY } from 'src/domain/user';
import { OnDiskUserModule } from './disk';
import { UserRepositorySource } from './user.repository';

@Module({
  imports: [OnDiskUserModule],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositorySource,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
