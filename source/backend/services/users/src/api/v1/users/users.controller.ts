import { Controller, Post, Body, Req, Res, HttpStatus, Get, Param } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UserCreateDto } from './service/dto/user.create.dto';
import { Request, Response } from 'express';

@Controller()
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
          message: serviceResponse.description,
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
        message: 'Something wrong happened. Please contact an administrator.',
      });
  }

  @Get()
  async list(@Res() response: Response) {
    const serviceResponse = await this.usersService.findAll();
    let statusCode: HttpStatus = HttpStatus.OK;
    if (serviceResponse.status === 200) {
      return response
        .status(HttpStatus.OK)
        .send({
          statusCode,
          message: serviceResponse.description,
          payload: { users: serviceResponse.payload.users },
        });
    }

    statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    return response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({
        statusCode,
        message: 'Something wrong happened. Please contact an administrator.',
      });
  }

  @Get(':id')
  async show(@Param('id') uuid: string, @Res() response: Response) {
    const serviceResponse = await this.usersService.findById(uuid);
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

  // @Get('profile')
  // async profile(@Req() request, @Res() response: Response) {
  //   const userId: string = request.user.id;
  //   const serviceResponse = await this.usersService.findById(userId);
  //   if (serviceResponse.status === 200) {
  //     return response
  //       .status(HttpStatus.OK)
  //       .send({
  //         statusCode: HttpStatus.OK,
  //         message: serviceResponse.description,
  //         payload: { user: serviceResponse.payload.user },
  //       });
  //   }

  //   if (serviceResponse.status === 404) {
  //     return response
  //       .status(HttpStatus.NOT_FOUND)
  //       .send({
  //         statusCode: HttpStatus.NOT_FOUND,
  //         message: serviceResponse.description,
  //         payload: {},
  //       });
  //   }

  //   return response
  //     .status(HttpStatus.INTERNAL_SERVER_ERROR)
  //     .send({
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       message: 'Something wrong happened. Please contact an administrator.',
  //     });
  // }

}
