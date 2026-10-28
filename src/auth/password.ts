import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scryptAsync = promisify(scrypt);

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const hash = (await scryptAsync(password, salt, 64)) as Buffer;

  return `${salt}:${hash.toString('hex')}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(':');
  const expected = Buffer.from(hash, 'hex');
  const actual = (await scryptAsync(password, salt, expected.length)) as Buffer;

  return timingSafeEqual(actual, expected);
}
