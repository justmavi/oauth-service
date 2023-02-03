import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('facebook'))
  @Get('facebook')
  getFacebookProfileAfterAuthSuccess(@Req() request: Request) {
    console.log('user', request.user);
    console.log('deviceId hash', request.query.state);

    return HttpStatus.OK;
  }

  @UseGuards(AuthGuard('vkontakte'))
  @Get('vkontakte')
  getVkontakteProfileAfterAuthSuccess(@Req() request: Request) {
    console.log('user', request.user);
    console.log('deviceId hash', request.query.state);

    return HttpStatus.OK;
  }
}
