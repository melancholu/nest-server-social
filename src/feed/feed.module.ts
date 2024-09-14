import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FeedDataSourceModule } from 'src/infrastructure/repository/feed';
import { UserDataSourceModule } from 'src/infrastructure/repository/user';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';

@Module({
  imports: [
    FeedDataSourceModule,
    UserDataSourceModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
