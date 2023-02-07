import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from 'src/data/entities/token.entity';
import { Repository } from 'typeorm';
import { AuthDTO } from '../dto/auth.dto';
import { OAuthProvider } from 'src/enums/oauth-provider.enum';
import { v4 as generateUUID } from 'uuid';
import { from, map, mergeMap, of, throwError } from 'rxjs';

@Injectable()
export class OAuthService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  public saveAuthData(
    userId: number,
    oauthProvider: OAuthProvider,
    authData: AuthDTO,
  ) {
    const entity = this.tokenRepository.create({
      userId,
      provider: oauthProvider,
      token: generateUUID(),
      ...authData,
    });

    return from(this.tokenRepository.save(entity));
  }

  /**
   * Checks if token is exists and belongs to user's device
   * @param token Token
   * @param deviceIdHash Hash of user's device ID
   * @returns **false** - when token for specified device was not found. If found - returns **record ID**
   */
  public isTokenValid(token: string, deviceIdHash: string) {
    return from(
      this.tokenRepository.findOneBy({ token, deviceId: deviceIdHash }),
    ).pipe(map((x) => (!x ? false : x.id)));
  }

  public deleteToken(tokenId: number) {
    return from(this.tokenRepository.delete(tokenId)).pipe(
      mergeMap((result) =>
        result.affected
          ? of(true)
          : throwError(() => new Error('Token not found')),
      ),
    );
  }
}
