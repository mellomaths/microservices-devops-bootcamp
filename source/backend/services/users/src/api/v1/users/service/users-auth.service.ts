import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import * as gravatar from 'gravatar';

import * as bcrypt from 'bcryptjs';

import { UserEntity } from './entities/user.entity';
import { UserCreateDto } from './dto/user.create.dto';

import { ServiceResponse, ServiceError, ServiceValidationResponse } from '../../utils/service.response';

@Injectable()
export class UsersAuthService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) { }

  async hashPassword(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(10);
    const hash: string = await bcrypt.hash(password, salt);
    return hash;
  }

  async comparePassword(password: string, attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, password);
  }

  async checkLoginAttempt(email: string, attempt: string): Promise<ServiceResponse> {
    const user: UserEntity = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      const description: string = `User ${email} was not found.`;
      return { status: 404, payload: {}, errors: [], description };
    }

    const passwordMatched: boolean = await this.comparePassword(user.password, attempt);
    if (!passwordMatched) {
      const description: string = `Bad password`;
      return { status: 401, payload: {}, errors: [], description };
    }

    return {
      status: 200,
      payload: {
        user: {
          ...user,
          password: undefined,
        },
      },
      errors: [],
      description: 'OK',
    };
  }

}
