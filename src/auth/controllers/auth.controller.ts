import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';
import { AuthDTO } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('facebook'))
  @Get('facebook')
  getFacebookProfileAfterAuthSuccess(@Req() request: Request) {
    const user = request.user;
    const state = plainToClass(AuthDTO, request.query.state);

    return HttpStatus.OK;
  }

  @UseGuards(AuthGuard('vkontakte'))
  @Get('vkontakte')
  getVkontakteProfileAfterAuthSuccess(@Req() request: Request) {
    const user = request.user;
    const state = plainToClass(AuthDTO, request.query.state);

    return HttpStatus.OK;
  }

  @UseGuards(AuthGuard('odnoklassniki'))
  @Get('odnoklassniki')
  getOdnoklassnikiProfileAfterAuthSuccess(@Req() request: Request) {
    const user = request.user;
    const state = plainToClass(AuthDTO, request.query.state);

    return HttpStatus.OK;
  }
}
