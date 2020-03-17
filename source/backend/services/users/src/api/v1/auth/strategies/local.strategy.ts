import { Strategy } from 'passport-local';

import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';

import { UsersAuthService } from '../../users/service/users-auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly usersAuthService: UsersAuthService,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const serviceResponse = await this.usersAuthService.checkLoginAttempt(email, password);
    if (serviceResponse.status === 404 || serviceResponse.status === 401) {
      throw new UnauthorizedException();
    }

    if (serviceResponse.status === 200) {
      return serviceResponse.payload.user;
    }

    throw new InternalServerErrorException();
  }
}
