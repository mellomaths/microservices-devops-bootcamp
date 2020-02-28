import { Module } from '@nestjs/common';

import { Routes } from 'nest-router';

import { GithubController } from './github.controller';
import { GithubService } from './github.service';

export const githubRoutes: Routes = [];

@Module({
  controllers: [GithubController],
  providers: [GithubService],
})
export class GithubModule { }
