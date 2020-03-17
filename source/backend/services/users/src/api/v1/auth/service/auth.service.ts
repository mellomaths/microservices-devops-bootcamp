import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserCreateJwtDto } from './dto/user.create.jwt.dto';
import { UserJwtDto } from './dto/user.jwt.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  login(user: UserCreateJwtDto): UserJwtDto {
    const payload = {
      id: user.id,
    };
    const token = this.jwtService.sign(payload);
    return { sub: user.id, token, expiresIn: this.configService.get('jwt.expirationTime') };
  }

}
