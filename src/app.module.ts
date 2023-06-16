import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './app.config';
import dataSource from './data/data-source';
import { Environment } from './enums/environment.enum';
import { GlobalExceptionFilter } from './global/exception-filter.global';
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
        });
      },
    }),
    AuthModule,
    OAuthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
