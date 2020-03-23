import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import * as gravatar from 'gravatar';

import { UserEntity } from './entities/user.entity';
import { UserCreateDto } from './dto/user.create.dto';

import { ServiceResponse, ServiceError, ServiceValidationResponse } from '../../utils/service.response';
import { UsersAuthService } from './users-auth.service';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly usersAuthService: UsersAuthService,
  ) { }

  async validate(user: UserCreateDto): Promise<ServiceValidationResponse> {
    let isOk = true;
    const errors: ServiceError[] = [];

    const existingUser: UserEntity = await this.usersRepository.findOne({ where: { email: user.email } });
    if (existingUser) {
      isOk = false;
      errors.push({ code: 'CONFLICT', field: 'email', message: 'Email already registered.' });
    }

    return { isOk, errors };
  }

  getAvatarHash(email: string): string {
    const avatar = gravatar.url(email);
    const hash = avatar.replace('//www.gravatar.com/avatar/', '');
    return hash;
  }

  getGravatarInfo(hash: string) {
    const options = { size: '200', rating: 'pg', default: 'mm' };
    const baseUrl = `://www.gravatar.com/avatar/${hash}`;
    const info = {
      url: {
        http: `http${baseUrl}`,
        https: `https${baseUrl}`,
      },
      profileUrl: `https${baseUrl}?s=${options.size}&r=${options.rating}&d=${options.default}`,
      hash,
      options,
    };

    return info;
  }

  async save(data: UserCreateDto): Promise<ServiceResponse> {
    const validation = await this.validate(data);
    if (!validation.isOk) {
      return { status: 422, errors: validation.errors, payload: {}, description: 'Server was not able to save this user.' };
    }

    const avatar = this.getAvatarHash(data.email);
    const password = await this.usersAuthService.hashPassword(data.password);

    const user: UserEntity = this.usersRepository.create({ ...data, avatar, password });
    await this.usersRepository.save(user);

    return { status: 201, payload: { user }, errors: [], description: 'User successfully created.' };
  }

  async findByEmail(email: string): Promise<ServiceResponse> {
    const user: UserEntity = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      const message: string = `User ${email} was not found.`;
      return { status: 404, payload: {}, errors: [], description: message };
    }

    const avatar = this.getGravatarInfo(user.avatar);
    return { status: 200, payload: { user: { ...user, avatar, password: undefined } }, errors: [], description: 'User found.' };
  }

  async findAll(): Promise<ServiceResponse> {
    const users: UserEntity[] = await this.usersRepository.find();
    let message: string = 'Successfully found users.';
    if (users.length === 0) {
      message = 'No user registered yet.';
    }

    return {
      status: 200,
      payload: {
        users: users.map(usr => ({ ...usr, avatar: this.getGravatarInfo(usr.avatar), password: undefined })),
      },
      errors: [],
      description: message,
    };
  }

  async findById(uuid: string): Promise<ServiceResponse> {
    const user: UserEntity = await this.usersRepository.findOne(uuid);
    if (!user) {
      const message: string = `User ${uuid} was not found.`;
      return { status: 404, payload: {}, errors: [], description: message };
    }

    const avatar = this.getGravatarInfo(user.avatar);
    return { status: 200, payload: { user: { ...user, avatar, password: undefined } }, errors: [], description: 'User found.' };
  }

  async findProfile(id: string): Promise<ServiceResponse> {
    const user: UserEntity = await this.usersRepository.findOne(id, { relations: ['profile'] });
    if (!user) {
      const message: string = `User ${id} was not found.`;
      return { status: 404, payload: {}, errors: [], description: message };
    }

    const { profile } = user;
    if (!user.profile) {
      const message: string = `USer ${id} doesn't have a profile created.`;
      return { status: 404, payload: {}, errors: [], description: message };
    }

    return { status: 200, payload: { profile }, errors: [], description: 'Profile found.' };
  }
}
