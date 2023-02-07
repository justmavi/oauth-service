import { Request as ExpressRequest } from 'express';
import { User } from './user.type';

export interface Request extends ExpressRequest {
  user: User;
}
