import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Profile, Strategy } from 'passport-facebook';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { createHash } from 'crypto';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get('facebook.clientID'),
      clientSecret: configService.get('facebook.clientSecret'),
      callbackURL: configService.get('facebook.callbackURL'),
      scope: 'gaming_profile,email,gaming_user_picture',
      profileFields: ['emails', 'name', 'photos'],
    });
  }

  authenticate(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    options?: object,
  ): void {
    const { deviceId, code } = req.query;

    if (!code) {
      if (!deviceId || typeof deviceId !== 'string')
        throw new BadRequestException('DeviceID is required');

      const deviceIdHash = createHash('sha256').update(deviceId).digest('hex');
      Object.assign(options, { state: deviceIdHash });
    }

    return super.authenticate(req, options);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;
    const user = {
      id,
      email: emails[0].value,
      firstName: name.givenName,
      photo: photos[0].value,
    };
    done(null, user);
  }
}
