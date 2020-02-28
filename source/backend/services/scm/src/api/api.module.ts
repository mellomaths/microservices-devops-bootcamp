import { Module } from '@nestjs/common';

import { Routes, RouterModule } from 'nest-router';

import { V1Module, V1Routes } from './v1/v1.module';

export const ApiRoutes: Routes = [
  {
    path: '/v1',
    module: V1Module,
    children: V1Routes,
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
