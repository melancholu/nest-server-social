import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOptions } from './rdb.config';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmOptions)],
})
export class RDBModule {}
