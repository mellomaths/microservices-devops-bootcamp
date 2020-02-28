import { Module } from '@nestjs/common';

import { Routes, RouterModule } from 'nest-router';

import { ApiModule, ApiRoutes } from './api/api.module';

const AppRoutes: Routes = [
  {
    path: '/api/scm',
    module: ApiModule,
    children: ApiRoutes,
  },
];

@Module({
  imports: [
    RouterModule.forRoutes(AppRoutes),
    ApiModule,
  ],
  controllers: [],
  providers: [],
  exports: [RouterModule],
})
export class AppModule { }
