import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Params, Profile, Strategy, VerifyCallback } from 'passport-vkontakte';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { createHash } from 'crypto';

@Injectable()
export class VkontakteStrategy extends PassportStrategy(Strategy, 'vkontakte') {
  constructor(configService: ConfigService) {
    super(
      {
        clientID: configService.get('vkontakte.clientID'),
        clientSecret: configService.get('vkontakte.clientSecret'),
        callbackURL: configService.get('vkontakte.callbackURL'),
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  authenticate(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    options?: object,
  ) {
    const { deviceId, code } = req.query;

    if (!code) {
      if (!deviceId || typeof deviceId !== 'string')
        throw new BadRequestException('DeviceID is required');

      const deviceIdHash = createHash('sha256').update(deviceId).digest('hex');
      Object.assign(options, { state: deviceIdHash });
    }
    return super.authenticate(req, options);
  }
}
