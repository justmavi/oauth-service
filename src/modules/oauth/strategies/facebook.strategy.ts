import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-facebook';
import { BaseStrategy } from './base/base.strategy';

@Injectable()
export class FacebookStrategy extends BaseStrategy(Strategy, 'facebook') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get('oauth.facebook.clientID'),
      clientSecret: configService.get('oauth.facebook.clientSecret'),
      callbackURL: configService.get('oauth.facebook.callbackURL'),
      scope: 'gaming_profile,email,gaming_user_picture',
      profileFields: ['emails', 'name', 'photos'],
    });
  }
}
