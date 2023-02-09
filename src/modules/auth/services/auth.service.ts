import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { from, mergeMap, of, throwError } from 'rxjs';
import { Request } from 'src/types/request.type';
import { Repository } from 'typeorm';
import { Token } from '../../../data/entities/token.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    @Inject(REQUEST) private readonly request: Request,
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
        .andWhere('device_id = :deviceIdhash', { deviceIdHash })
        .returning('*')
        .execute(),
    ).pipe(
      mergeMap((result) => {
        if (!result.affected)
          throwError(() => new UnauthorizedException('INVALID_TOKEN'));

        const entity = result.raw[0] as Token;
        return of({ userId: entity.userId, tokenId: entity.id });
      }),
    );
  }

  public unauthorize(tokenId: number) {
    return from(
      this.tokenRepository.delete({
        id: tokenId,
        userId: this.request.auth.userId,
      }),
    ).pipe(
      mergeMap((result) =>
        result.affected
          ? of(true)
          : throwError(() => new Error('Token not found')),
      ),
    );
  }
}
