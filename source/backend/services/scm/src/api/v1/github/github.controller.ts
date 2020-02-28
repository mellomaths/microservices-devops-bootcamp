import { Controller, Get, Param, Query } from '@nestjs/common';

import { GithubService } from './github.service';

@Controller()
export class GithubController {

  constructor(
    private readonly githubService: GithubService,
  ) { }

  @Get('repositories/:username')
  repositories(
    @Param('username') username: string,
    @Query('limit') limit: number,
    @Query('sort') sort: string,
  ) {
    return this.githubService.findRepositories(username, { limit, sort });
  }
}
