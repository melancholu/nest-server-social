import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RDBModule } from 'src/infrastructure/accessor/rdb';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), RDBModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
