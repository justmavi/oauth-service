import { createHash } from 'crypto';

export function sha256Hash(str: string) {
  return createHash('sha256').update(str).digest('hex');
}
