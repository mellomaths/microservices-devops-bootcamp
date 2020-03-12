import { Module, HttpModule } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { Routes } from 'nest-router';

import { GithubController } from './github.controller';
import { GithubService } from './github.service';

import github from './keys.config';

export const githubRoutes: Routes = [];

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [github],
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [GithubController],
  providers: [GithubService],
})
export class GithubModule { }
