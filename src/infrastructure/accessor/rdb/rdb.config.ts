import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeOrmOptions: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      type: 'postgres',
      database: configService.get('POSTGRES_DB'),
      host: configService.get('POSTGRES_HOST'),
      password: configService.get('POSTGRES_PASSWORD'),
      port: +configService.get('POSTGRES_PORT'),
      username: configService.get('POSTGRES_USER'),
      entities: [],
      extra: {
        /**
         * https://node-postgres.com/api/pool
         */
        idleTimeoutMillis: 3000,
        max: 30,
      },
    };
  },
};
