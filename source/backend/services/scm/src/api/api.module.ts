import { Module } from '@nestjs/common';

import { Routes, RouterModule } from 'nest-router';

import { V1Module, v1Routes } from './v1/v1.module';

export const apiRoutes: Routes = [
  {
    path: '/v1',
    module: V1Module,
    children: v1Routes,
  },
];

@Module({
  imports: [
    V1Module,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ApiModule { }
