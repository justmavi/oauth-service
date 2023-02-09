import { Request as ExpressRequest } from 'express';
import { Token } from 'src/data/entities/token.entity';
import { User } from './user.type';

export interface Request extends ExpressRequest {
  user: User;
  auth: Token;
}
