import { Module } from '@nestjs/common';

import { Routes } from 'nest-router';

import { UsersModule, usersRoutes } from './users/users.module';

export const V1Routes: Routes = [
  {
    path: '/users',
    module: UsersModule,
    children: usersRoutes,
  },
];

@Module({
  imports: [
    UsersModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class V1Module { }
