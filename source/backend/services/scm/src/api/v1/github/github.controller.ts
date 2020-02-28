import { Controller, Get } from '@nestjs/common';

@Controller()
export class GithubController {

  @Get()
  list() {
    return { ok: true };
  }
}
