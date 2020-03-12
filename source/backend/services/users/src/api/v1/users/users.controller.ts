import { Controller, Post, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UserCreateDto } from './service/dto/user.create.dto';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Post()
  async create(@Body() data: UserCreateDto, @Req() request: Request, @Res() response: Response) {
    const serviceResponse = await this.usersService.save(data);

    let statusCode: HttpStatus;

    if (serviceResponse.status === 422) {
      statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
      return response
        .status(statusCode)
        .send({
          statusCode,
          message: 'Service was not able to save the user informed',
          errors: serviceResponse.errors,
        });
    }

    if (serviceResponse.status === 201) {
      statusCode = HttpStatus.CREATED;
      return response
        .header('Location', `${request.url}/${serviceResponse.payload.user.id}`)
        .status(statusCode)
        .send();
    }

    statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    return response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({
        statusCode,
        message: 'Something wrong happened. Please contact an administrator',
      });
  }

}
