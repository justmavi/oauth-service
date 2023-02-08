import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Params, Profile, Strategy, VerifyCallback } from 'passport-vkontakte';
import { BaseStrategy } from './base/base.strategy';

@Injectable()
export class VkontakteStrategy extends BaseStrategy(Strategy, 'vkontakte') {
  constructor(configService: ConfigService) {
    super(
      {
        clientID: configService.get('oauth.vkontakte.clientID'),
        clientSecret: configService.get('oauth.vkontakte.clientSecret'),
        callbackURL: configService.get('oauth.vkontakte.callbackURL'),
        scope: 'profile,email',
        profileFields: ['emails', 'name', 'photos'],
      },
      function (
        accessToken: string,
        refreshToken: string,
        params: Params,
        profile: Profile,
        done: VerifyCallback,
      ) {
        const { id, name, emails, photos } = profile;
        const user = {
          id,
          email: emails[0].value,
          firstName: name.givenName,
          photo: photos[0].value,
        };

        done(null, user);
      },
    );
  }
}
