import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.TOKEN_SECRET,
  expirationTime: parseInt(process.env.TOKEN_EXPIRATION_TIME, 10) || 3600,
}));
