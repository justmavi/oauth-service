import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST ?? 'localhost',
  port: +process.env.POSTGRES_PORT ?? 5432,
  username: process.env.POSTGRES_USERNAME ?? 'postgres',
  password: process.env.POSTGRES_PASSWORD ?? '',
  database: process.env.POSTGRES_DATABASE ?? 'postgres',
  maxQueryExecutionTime: +process.env.MAX_QUERY_EXECUTION_TIME ?? 1000,
  migrationsTableName: 'typeorm_migrations',
  entities: ['dist/data/entities/*.entity{.ts,.js}'],
  migrations: ['dist/data/migrations/*.migration{.ts,.js}'],
  namingStrategy: new SnakeNamingStrategy(),
});
