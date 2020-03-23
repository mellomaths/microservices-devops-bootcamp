import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Routes } from 'nest-router';

import { UsersModule, usersRoutes } from './users/users.module';
import { AuthModule, authRoutes } from './auth/auth.module';
import { ProfilesModule, profilesRoutes } from './profiles/profiles.module';

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
  {
    path: '/users/profile',
    module: ProfilesModule,
    children: profilesRoutes,
  },
];

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jwt],
    }),
    UsersModule,
    AuthModule,
    ProfilesModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class V1Module { }
