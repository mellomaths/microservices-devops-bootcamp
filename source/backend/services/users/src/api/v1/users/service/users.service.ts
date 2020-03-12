import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';
import { UserCreateDto } from './dto/user.create.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) { }

  async validate(user: UserCreateDto) {
    let isOk = true;
    const errors = [];

    const existingUser: UserEntity = await this.usersRepository.findOne({ where: { email: user.email } });
    if (existingUser) {
      isOk = false;
      errors.push({ code: 'CONFLICT', field: 'email', message: 'Email already registered' });
    }

    return { isOk, errors };
  }

  async save(data: UserCreateDto) {
    const validation = await this.validate(data);
    if (!validation.isOk) {
      return { status: 422, errors: validation.errors, payload: {} };
    }

    const user: UserEntity = this.usersRepository.create({ ...data });
    await this.usersRepository.save(user);

    return { status: 201, payload: { user }, errors: [] };
  }

}
