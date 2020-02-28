import { Module } from '@nestjs/common';

import { Routes } from 'nest-router';

import { GithubModule, githubRoutes } from './github/github.module';

export const v1Routes: Routes = [
  {
    path: '/github',
    module: GithubModule,
    children: githubRoutes,
  },
];

@Module({
  imports: [
    GithubModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class V1Module { }
