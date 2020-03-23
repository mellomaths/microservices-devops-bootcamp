import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UsersService } from '../../users/service/users.service';
import { ProfileEntity } from './entities/profile.entity';

import { ServiceResponse } from '../../utils/service.response';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profilesRepository: Repository<ProfileEntity>,
    private readonly usersService: UsersService,
  ) { }

  async findProfileByUserId(userId: string): Promise<ServiceResponse> {
    return this.usersService.findProfile(userId);
  }

}
