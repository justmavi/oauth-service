import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from 'src/data/entities/token.entity';
import { OAuthController } from './controllers/oauth.controller';
import { OAuthService } from './services/oauth.service';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { OdnoklassnikiStrategy } from './strategies/odnoklassniki.strategy';
import { VkontakteStrategy } from './strategies/vkontakte.strategy';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, PassportModule, TypeOrmModule.forFeature([Token])],
  controllers: [OAuthController],
  providers: [
    OAuthService,
    FacebookStrategy,
    VkontakteStrategy,
    OdnoklassnikiStrategy,
  ],
})
export class OAuthModule {}
