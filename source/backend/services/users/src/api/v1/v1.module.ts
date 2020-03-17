import { Module } from '@nestjs/common';

import { Routes } from 'nest-router';

import { UsersModule, usersRoutes } from './users/users.module';
import { AuthModule, authRoutes } from './auth/auth.module';

export const V1Routes: Routes = [
  {
    path: '/users',
    module: UsersModule,
    children: usersRoutes,
  },
  {
    path: '/auth',
    module: AuthModule,
    children: authRoutes,
  }
];

@Module({
  imports: [
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class V1Module { }
