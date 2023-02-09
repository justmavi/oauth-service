import { Body, Controller, Post } from '@nestjs/common';
import {
  Delete,
  Get,
  Inject,
  Param,
  UseGuards,
} from '@nestjs/common/decorators';
import { REQUEST } from '@nestjs/core';
import { map } from 'rxjs';
import { RequestResult } from 'src/enums/request-result.enum';
import { buildResponseObject } from 'src/helpers/response-object-builder.helper';
import { sha256Hash } from 'src/helpers/sha256.helper';
import { Request } from 'src/types/request.type';
import { AuthrorizeDTO } from '../dto/authorize.dto';
import { UnauthorizeDTO } from '../dto/unauthorize.dto';
import { TokenGuard } from '../guards/token.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  @Post()
  public authroize(@Body() data: AuthrorizeDTO) {
    const deviceIdHash = sha256Hash(data.deviceId);

    return this.authService
      .authorize(data.token, deviceIdHash)
      .pipe(
        map((result) =>
          buildResponseObject(RequestResult.Success, null, result),
        ),
      );
  }

  @Get()
  @UseGuards(TokenGuard)
  public getUserTokens() {
    return this.authService.getUserTokens(this.request.auth.userId).pipe(
      map((result) =>
        result.map((entity) => ({
          id: entity.id,
          deviceName: entity.deviceName,
          lastLoginDate: entity.lastLoginDate,
          userAgent: entity.userAgent,
        })),
      ),
    );
  }

  @Delete('/:id')
  @UseGuards(TokenGuard)
  public unauthorize(@Param() { tokenId }: UnauthorizeDTO) {
    return this.authService
      .unauthorize(this.request.auth.userId, tokenId)
      .pipe(map(() => buildResponseObject(RequestResult.Success)));
  }
}
