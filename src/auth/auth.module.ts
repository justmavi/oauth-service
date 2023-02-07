import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { OAuthController } from './controllers/oauth.controller';
import { AuthService } from './services/auth.service';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { OdnoklassnikiStrategy } from './strategies/odnoklassniki.strategy';
import { VkontakteStrategy } from './strategies/vkontakte.strategy';

@Module({
  imports: [PassportModule],
  controllers: [OAuthController],
  providers: [
    AuthService,
    FacebookStrategy,
    VkontakteStrategy,
    OdnoklassnikiStrategy,
  ],
})
export class AuthModule {}
