import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeOrmOptions: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      type: 'postgres',
      ssl: false,
      database: configService.get('POSTGRES_DB'),
      host: configService.get('POSTGRES_HOST'),
      password: configService.get('POSTGRES_PASSWORD'),
      port: +configService.get('POSTGRES_PORT'),
      username: configService.get('POSTGRES_USER'),
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/migrations/*{.ts,.js}'],
      migrationsTableName: 'migrations',
      migrationsRun: true,
      autoLoadEntities: true,
      extra: {
        statement_timeout: 120_000,
        max: 60,
      },
    };
  },
};
