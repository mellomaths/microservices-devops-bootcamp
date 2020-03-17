import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Routes } from 'nest-router';

import { UsersModule, usersRoutes } from './users/users.module';
import { AuthModule, authRoutes } from './auth/auth.module';

import jwt from './core/config/jwt.config';

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
  },
];

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jwt],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class V1Module { }
