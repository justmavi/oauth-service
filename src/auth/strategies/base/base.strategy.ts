import { BadRequestException } from '@nestjs/common';
import { PassportStrategy, Type } from '@nestjs/passport';
import { createHash } from 'crypto';
import { Profile } from 'passport';
import { ParamsDictionary } from 'express-serve-static-core';
import { Request } from 'express';
import { ParsedQs } from 'qs';

export function BaseStrategy<T extends Type<any> = any>(
  strategy: T,
  name: string,
) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  class Strategy extends PassportStrategy(strategy, name) {
    constructor(options: object, handler?: (...args: any[]) => void) {
      super(
        options,
        handler ??
          ((
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            done: (err: any, user: any, info?: any) => void,
          ) => {
            const { id, name, emails, photos } = profile;
            const user = {
              id,
              email: emails[0].value,
              firstName: name.givenName,
              photo: photos[0].value,
            };

            done(null, user);
          }),
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

        const deviceIdHash = createHash('sha256')
          .update(deviceId)
          .digest('hex');
        Object.assign(options, { state: deviceIdHash });
      }
      return super.authenticate(req, options);
    }
  }

  return Strategy;
}
