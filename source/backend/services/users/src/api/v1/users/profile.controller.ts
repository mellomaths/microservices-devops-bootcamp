import { Controller, Req, Res, HttpStatus, Get, UseGuards } from '@nestjs/common';

import { Response } from 'express';

import { UsersService } from './service/users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller()
export class ProfileController {

  constructor(
    private readonly usersService: UsersService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Req() request, @Res() response: Response) {
    const userId: string = request.user.id;
    const serviceResponse = await this.usersService.findById(userId);
    if (serviceResponse.status === 200) {
      return response
        .status(HttpStatus.OK)
        .send({
          statusCode: HttpStatus.OK,
          message: serviceResponse.description,
          payload: { user: serviceResponse.payload.user },
        });
    }

    if (serviceResponse.status === 404) {
      return response
        .status(HttpStatus.NOT_FOUND)
        .send({
          statusCode: HttpStatus.NOT_FOUND,
          message: serviceResponse.description,
          payload: {},
        });
    }

    return response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something wrong happened. Please contact an administrator.',
      });
  }

}
