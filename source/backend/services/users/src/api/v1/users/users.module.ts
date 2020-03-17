import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Routes } from 'nest-router';

import { UsersService } from './service/users.service';
import { UsersAuthService } from './service/users-auth.service';
import { UsersController } from './users.controller';
import { ProfileController } from './profile.controller';
import { UserEntity } from './service/entities/user.entity';

export const usersRoutes: Routes = [];

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UsersService, UsersAuthService],
  controllers: [ProfileController, UsersController],
  exports: [UsersService, UsersAuthService],
})
export class UsersModule { }
