import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Routes } from 'nest-router';

import { UsersModule } from '../users/users.module';

import { ProfileController } from './profiles.controller';

import { ProfilesService } from './service/profiles.service';

import { ProfileEntity } from './service/entities/profile.entity';
import { AddressEntity } from './service/entities/address.entity';
import { ScmEntity } from './service/entities/scm.entity';
import { ExperienceEntity } from './service/entities/experience.entity';
import { SkillEntity } from './service/entities/skill.entity';

export const profilesRoutes: Routes = [];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AddressEntity,
      ScmEntity,
      ExperienceEntity,
      SkillEntity,
      ProfileEntity,
    ]),
    UsersModule,
  ],
  controllers: [ProfileController],
  providers: [ProfilesService],
  exports: [ProfilesService],
})
export class ProfilesModule { }
