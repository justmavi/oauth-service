import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { VkontakteStrategy } from './strategies/vkontakte.strategy';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService, FacebookStrategy, VkontakteStrategy],
})
export class AuthModule {}
