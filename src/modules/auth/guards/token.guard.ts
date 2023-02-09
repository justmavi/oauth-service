import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { mergeMap, of, throwError } from 'rxjs';
import { sha256Hash } from 'src/helpers/sha256.helper';
import { Request } from 'src/types/request.type';
import { AuthService } from '../services/auth.service';

export class TokenGuard implements CanActivate {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization?.split('Bearer ')[1];
    const deviceId = request.headers['device-id'] as string;

    if (!token || !deviceId)
      return throwError(() => new UnauthorizedException());

    const deviceIdHash = sha256Hash(deviceId);

    return this.authService.getTokenInstance(token, deviceIdHash).pipe(
      mergeMap((tokenInstance) => {
        if (!tokenInstance) {
          return throwError(() => new UnauthorizedException());
        }

        request.auth = tokenInstance;
        return of(true);
      }),
    );
  }
}
