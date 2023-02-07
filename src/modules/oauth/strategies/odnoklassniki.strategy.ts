import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-odnoklassniki';
import { BaseStrategy } from './base/base.strategy';

@Injectable()
export class OdnoklassnikiStrategy extends BaseStrategy(
  Strategy,
  'odnoklassniki',
) {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get('odnoklassniki.clientID'),
      clientPublic: configService.get('odnoklassniki.clientPublic'),
      clientSecret: configService.get('odnoklassniki.clientSecret'),
      callbackURL: configService.get('odnoklassniki.callbackURL'),
      scope: 'VALUABLE_ACCESS,GET_EMAIL',
      profileFields: ['email', 'name'],
    });
  }
}
