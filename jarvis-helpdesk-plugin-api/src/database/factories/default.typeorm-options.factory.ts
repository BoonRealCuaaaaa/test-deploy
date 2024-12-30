import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DefaultTypeOrmOptionsFactory implements TypeOrmOptionsFactory {
  static defaultName = 'DefaultTypeOrm';

  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      database: this.configService.get('db.name'),
      dropSchema: false,
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      host: this.configService.get('db.host'),
      logging: this.configService.get('nodeEnv') !== 'production',
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      password: this.configService.get('db.password'),
      port: this.configService.get('db.port'),
      schema: 'public',
      synchronize: false,
      type: this.configService.get('db.type'),
      username: this.configService.get('db.username'),
      cli: {
        entitiesDir: 'src',
        migrationsDir: 'src/db/migrations',
        subscribersDir: 'subscriber',
      },
      extra: {
        // based on https://node-postgres.com/api/pool
        // max connection pool size
        max: this.configService.get<number>('db.maxConnections'),
        ssl: this.configService.get<boolean>('db.sslEnabled')
          ? {
              rejectUnauthorized: this.configService.get<boolean>('db.rejectUnauthorized'),
            }
          : undefined,
      },
    } as TypeOrmModuleOptions;
  }
}
