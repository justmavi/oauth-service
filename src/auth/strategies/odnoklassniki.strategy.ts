import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Profile, Strategy } from 'passport-odnoklassniki';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { createHash } from 'crypto';

@Injectable()
export class OdnoklassnikiStrategy extends PassportStrategy(
  Strategy,
  'odnoklassniki',
) {
  constructor(configService: ConfigService) {
    super(
      {
        clientID: configService.get('odnoklassniki.clientID'),
        clientPublic: configService.get('odnoklassniki.clientPublic'),
        clientSecret: configService.get('odnoklassniki.clientSecret'),
        callbackURL: configService.get('odnoklassniki.callbackURL'),
        scope: 'VALUABLE_ACCESS,GET_EMAIL',
        profileFields: ['emails', 'name', 'photos'],
      },
      function (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (err: any, user: any, info?: any) => void,
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
