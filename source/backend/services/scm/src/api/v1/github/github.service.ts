import { Injectable, HttpService } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { Repository } from './models/repository.model';

@Injectable()
export class GithubService {

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) { }

  async findRepositories(username: string, { limit = 5, sort = 'desc' }: { limit?: number; sort?: string } = {}) {
    const clientId = this.configService.get<string>('github.clientId');
    const clientSecret = this.configService.get<string>('github.clientSecret');

    const url = `https://api.github.com/users/${username}/repos`;

    try {
      const response = await this.httpService
        .get(url,
          {
            params: {
              per_page: limit,
              sort,
              client_id: clientId,
              client_secret: clientSecret,
            },
          },
        )
        .toPromise();

      const repositories = response.data.map(element => Repository.createFromResponse(element));
      return repositories;
    } catch (error) {
      const { response } = error;

      switch (response.status) {
        case 404:
          return { status: 404, message: 'User was not found' };
        default:
          return { status: 502, message: 'Something wrong happened. Please contact an administrator.' };
      }
    }
  }
}
