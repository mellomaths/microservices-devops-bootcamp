import { Module } from '@nestjs/common';

import { Routes, RouterModule } from 'nest-router';

import { ApiModule, apiRoutes } from './api/api.module';

const routes: Routes = [
  {
    path: '/api/scm',
    module: ApiModule,
    children: apiRoutes,
  },
];

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    ApiModule,
  ],
  controllers: [],
  providers: [],
  exports: [RouterModule],
})
export class AppModule { }
