// Must be imported first to load .env file for process.env
import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource, DataSourceOptions } from 'typeorm';

import 'reflect-metadata';

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  schema: 'public',
  dropSchema: false,
  logging: process.env.NODE_ENV !== 'production',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'subscriber',
  },
  extra: {
    // based on https://node-postgres.com/api/pool
    // max connection pool size
    max: parseInt(process.env.DATABASE_MAX_CONNECTIONS ?? '100', 10),
    ssl:
      process.env.DATABASE_SSL_ENABLED === 'true'
        ? {
            rejectUnauthorized: process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
          }
        : undefined,
  },
} as DataSourceOptions);
