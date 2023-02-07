import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OAuthModule } from './modules/auth/oauth.module';
import config from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    OAuthModule,
  ],
  providers: [],
})
export class AppModule {}
