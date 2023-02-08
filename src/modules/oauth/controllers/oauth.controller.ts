import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs';
import { OAuthProvider } from 'src/enums/oauth-provider.enum';
import { Request } from '../../../types/request.type';
import { OAuthDTO } from '../dto/oauth.dto';
import { OAuthService } from '../services/oauth.service';

@Controller('oauth')
export class OAuthController {
  constructor(private readonly oauthService: OAuthService) {}

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
    const user = request.user;
    const state = plainToClass(
      OAuthDTO,
      JSON.parse(request.query.state as string),
    );

    return this.oauthService.saveAuthData(user.id, provider, state).pipe(
      map((tokenEntity) => ({
        access_token: tokenEntity.token,
        profile: user,
      })),
    );
  }
}
