import { Controller, UseGuards, Post, Request, Get } from '@nestjs/common';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './service/auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller()
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request) {
    return this.authService.login(request.user);
  }

}
