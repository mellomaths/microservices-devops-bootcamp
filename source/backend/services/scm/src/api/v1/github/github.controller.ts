import { Controller, Get, Param, Query } from '@nestjs/common';

import { GithubService } from './github.service';

@Controller()
export class GithubController {

  constructor(
    private readonly githubService: GithubService,
  ) { }

  @Get('repositories/:username')
  async repositories(
    @Param('username') username: string,
    @Query('limit') limit: number,
    @Query('sort') sort: string,
  ) {
    const serviceResponse = await this.githubService.findRepositories(username, { limit, sort });
    if (serviceResponse.status === 200) {
      return serviceResponse.data;
    }

    return serviceResponse;
  }
}
