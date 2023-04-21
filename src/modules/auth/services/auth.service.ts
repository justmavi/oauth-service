import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, mergeMap, of, throwError } from 'rxjs';
import { Repository } from 'typeorm';
import { Token } from '../../../data/entities/token.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  public getTokenInstance(token: string, deviceIdHash: string) {
    return from(
      this.tokenRepository.findOneBy({ token, deviceId: deviceIdHash }),
    );
  }

  public authorize(token: string, deviceIdHash: string) {
    return from(
      this.tokenRepository
        .createQueryBuilder()
        .update({ lastLoginDate: new Date() })
        .where('token = :token', { token })
        .andWhere('device_id = :deviceIdHash', { deviceIdHash })
        .returning('*')
        .execute(),
    ).pipe(
      mergeMap((result) => {
        if (!result.affected)
          return throwError(() => new UnauthorizedException('INVALID_TOKEN'));

        const entity = result.raw[0] as Token;
        return of({ userId: entity['user_id'], tokenId: entity.id });
      }),
    );
  }

  public unauthorize(userId: number, tokenId: number) {
    return from(
      this.tokenRepository.delete({
        id: tokenId,
        userId,
      }),
    ).pipe(
      mergeMap((result) =>
        result.affected
          ? of(true)
          : throwError(() => new BadRequestException('TOKEN_NOT_FOUND')),
      ),
    );
  }

  public getUserTokens(userId: number) {
    return from(this.tokenRepository.findBy({ userId }));
  }
}
