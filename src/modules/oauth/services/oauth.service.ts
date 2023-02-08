import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { Token } from 'src/data/entities/token.entity';
import { OAuthProvider } from 'src/enums/oauth-provider.enum';
import { Repository } from 'typeorm';
import { v4 as generateUUID } from 'uuid';
import { OAuthDTO } from '../dto/oauth.dto';

@Injectable()
export class OAuthService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  public saveAuthData(
    userId: number,
    oauthProvider: OAuthProvider,
    authData: OAuthDTO,
  ) {
    const entity = this.tokenRepository.create({
      userId,
      provider: oauthProvider,
      token: generateUUID(),
      ...authData,
    });

    return from(this.tokenRepository.save(entity));
  }
}
