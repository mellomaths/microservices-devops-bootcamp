import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Routes } from 'nest-router';

import { UsersService } from './service/users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './service/entities/user.entity';

export const usersRoutes: Routes = [];

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule { }
