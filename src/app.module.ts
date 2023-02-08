import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './app.config';
import dataSource from './data/data-source';
import { Environment } from './enums/environment.enum';
import { AuthModule } from './modules/auth/auth.module';
import { OAuthModule } from './modules/oauth/oauth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const isDevelopment =
          config.get('app.environment') === Environment.Development;

        return Object.assign(dataSource.options, {
          synchronize: isDevelopment,
          logging: isDevelopment ? 'all' : ['error', 'warn'],
          logger: isDevelopment ? 'advanced-console' : 'file',
          maxQueryExecutionTime: 1000,
        });
      },
    }),
    OAuthModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
