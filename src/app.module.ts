import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RDBModule } from 'src/infrastructure/accessor/rdb';
import { AuthModule } from './auth';
import { FeedModule } from './feed';
import { UserModule } from './user';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RDBModule,
    AuthModule,
    FeedModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
