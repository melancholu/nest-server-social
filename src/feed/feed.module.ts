import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FeedDataSourceModule } from 'src/infrastructure/repository/feed';
import { LikeDataSourceModule } from 'src/infrastructure/repository/like';
import { UserDataSourceModule } from 'src/infrastructure/repository/user';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';

@Module({
  imports: [
    FeedDataSourceModule,
    LikeDataSourceModule,
    UserDataSourceModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
