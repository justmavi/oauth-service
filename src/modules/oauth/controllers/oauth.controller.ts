import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { map, mergeMap, of } from 'rxjs';
import { OAuthProvider } from 'src/enums/oauth-provider.enum';
import { Request } from '../../../types/request.type';
import { OAuthDTO } from '../dto/oauth.dto';
import { OAuthService } from '../services/oauth.service';
import { AuthService } from 'src/modules/auth/services/auth.service';

@Controller('oauth')
export class OAuthController {
  constructor(private readonly oauthService: OAuthService, private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('facebook'))
  @Get('facebook')
  getFacebookProfileAfterAuthSuccess(@Req() request: Request) {
    return this.handleOAuthResponse(request, OAuthProvider.Facebook);
  }

  @UseGuards(AuthGuard('vkontakte'))
  @Get('vkontakte')
  getVkontakteProfileAfterAuthSuccess(@Req() request: Request) {
    return this.handleOAuthResponse(request, OAuthProvider.Vkontakte);
  }

  @UseGuards(AuthGuard('odnoklassniki'))
  @Get('odnoklassniki')
  getOdnoklassnikiProfileAfterAuthSuccess(@Req() request: Request) {
    return this.handleOAuthResponse(request, OAuthProvider.Odnoklassniki);
  }

  private handleOAuthResponse(request: Request, provider: OAuthProvider) {
    const { id } = request.user;
    const state = plainToClass(
      OAuthDTO,
      JSON.parse(request.query.state as string),
    );
    
    return this.authService.getDeviceToken(state.deviceId, state.userAgent).pipe(mergeMap((tokenEntity) => {
      if (!tokenEntity) return this.oauthService.saveAuthData(id, provider, state).pipe(
        map((tokenEntity) => ({
          access_token: tokenEntity.token,
        })),
      );

      return of({ access_token: tokenEntity.token })
    }));
  }
}
