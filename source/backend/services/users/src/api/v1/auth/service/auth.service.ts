import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserCreateJwtDto } from './dto/user.create.jwt.dto';
import { UserJwtDto } from './dto/user.jwt.dto';

import { jwtConstants } from '../config';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
  ) { }

  login(user: UserCreateJwtDto): UserJwtDto {
    const payload = {
      id: user.id,
    };
    const token = this.jwtService.sign(payload);
    return { sub: user.id, token, expiresIn: jwtConstants.expiresIn };
  }

}
