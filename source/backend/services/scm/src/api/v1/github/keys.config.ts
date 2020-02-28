import { registerAs } from '@nestjs/config';

export default registerAs('github', () => ({
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
}));
