import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule as UserDataSourceModule } from 'src/infrastructure/data-source/user';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    UserDataSourceModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
