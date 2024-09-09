import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FeedDataSourceModule } from 'src/infrastructure/repository/feed';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';

@Module({
  imports: [
    FeedDataSourceModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
