import { Body, Controller, Post } from '@nestjs/common';
import { Delete, Param } from '@nestjs/common/decorators';
import { createHash } from 'crypto';
import { map } from 'rxjs';
import { RequestResult } from 'src/enums/request-result.enum';
import { buildResponseObject } from 'src/helpers/response-object-builder.helper';
import { AuthrorizeDTO } from '../dto/authorize.dto';
import { UnauthorizeDTO } from '../dto/unauthorize.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  public authroize(@Body() data: AuthrorizeDTO) {
    const deviceIdHash = createHash('sha256')
      .update(data.deviceId)
      .digest('hex');

    return this.authService
      .authorize(data.token, deviceIdHash)
      .pipe(
        map((result) =>
          buildResponseObject(RequestResult.Success, null, result),
        ),
      );
  }

  @Delete('/:id')
  public unauthorize(@Param() { tokenId }: UnauthorizeDTO) {
    return this.authService
      .unauthorize(tokenId)
      .pipe(map(() => buildResponseObject(RequestResult.Success)));
  }
}
