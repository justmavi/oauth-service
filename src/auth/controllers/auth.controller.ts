import { Controller, Get, HttpStatus, Inject, UseGuards } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(@Inject(REQUEST) private readonly request: Express.Request) {}
  @UseGuards(AuthGuard('facebook'))
  @Get('facebook')
  async getProfileAfterAuthSuccess() {
    console.log('request', this.request);

    return HttpStatus.OK;
  }
}
