import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserDataSourceModule } from 'src/infrastructure/repository/user';
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
