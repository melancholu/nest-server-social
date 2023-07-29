import { Module } from '@nestjs/common';
import { UserModule as UserDataSourceModule } from 'src/infrastructure/data-source/user';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [UserDataSourceModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
