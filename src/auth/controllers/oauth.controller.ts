import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs';
import { OAuthProvider } from 'src/enums/oauth-provider.enum';
import { Request } from '../../types/request.type';
import { AuthDTO } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class OAuthController {
  constructor(private readonly authService: AuthService) {}

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
    const state = plainToClass(AuthDTO, request.query.state);

    return this.authService.saveAuthData(user.id, provider, state).pipe(
      map((tokenEntity) => ({
        access_token: tokenEntity.token,
        profile: user,
      })),
    );
  }
}
