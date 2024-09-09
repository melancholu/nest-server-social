import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOptions } from 'src/core/config/rdb.config';
import { AuthModule } from './auth';
import { FeedModule } from './feed';
import { UserModule } from './user';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmOptions),
    AuthModule,
    FeedModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
