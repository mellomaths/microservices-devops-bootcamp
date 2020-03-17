import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Routes, RouterModule } from 'nest-router';

import { ApiModule, ApiRoutes } from './api/api.module';

const AppRoutes: Routes = [
  {
    path: '/api/accounts',
    module: ApiModule,
    children: ApiRoutes,
  },
];

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    RouterModule.forRoutes(AppRoutes),
    ApiModule,
  ],
  controllers: [],
  providers: [],
  exports: [RouterModule],
})
export class AppModule { }
