import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

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
    TypeOrmModule.forRoot(),
    RouterModule.forRoutes(AppRoutes),
    ApiModule,
  ],
  controllers: [],
  providers: [],
  exports: [RouterModule],
})
export class AppModule { }
