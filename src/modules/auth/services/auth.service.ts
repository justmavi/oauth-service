import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    return from(this.tokenRepository.delete(tokenId)).pipe(
      mergeMap((result) =>
        result.affected
          ? of(true)
          : throwError(() => new Error('Token not found')),
      ),
    );
  }
}
