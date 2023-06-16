import { BadRequestException, Inject } from '@nestjs/common';
import { PassportStrategy, Type } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { Profile } from 'passport';
import { ParsedQs } from 'qs';
import { sha256Hash } from 'src/helpers/sha256.helper';
import { OAuthDTO } from '../../dto/oauth.dto';

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
              nickname: name.givenName,
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
      const { deviceId, deviceName, userAgent, code } = req.query;

      if (!code) {
        const instance = plainToClass(OAuthDTO, {
          deviceId,
          deviceName,
          userAgent,
        });

        const validationErrors = validateSync(instance);
        if (validationErrors.length)
          throw new BadRequestException('Invalid parameters');

        const deviceIdHash = sha256Hash(instance.deviceId);
        instance.deviceId = deviceIdHash;

        Object.assign(options, { state: JSON.stringify(instance) });
      }
      return super.authenticate(req, options);
    }
  }

  return Strategy;
}
