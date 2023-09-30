import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Request,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { UserNotFoundException } from 'src/core/exception';
import { User, UserPagination } from 'src/domain/user';
import { UserService } from './user.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard())
  @Get('/')
  async getList(@Query('page') page = 1): Promise<UserPagination> {
    try {
      if (Number.isNaN(page)) {
        return this.userService.getList(1);
      }
      return this.userService.getList(page);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard())
  @Get('/:uuid')
  async getOne(@Param('uuid') uuid: string): Promise<User> {
    try {
      const user = await this.userService.getOneByUuid(uuid);

      if (user === null) {
        throw new UserNotFoundException();
      }

      return user;
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw error;
      }

      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard())
  @Get('/me')
  async getMe(@Request() req): Promise<User> {
    try {
      const { uuid } = req.user;

      return await this.userService.getOneByUuid(uuid);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/')
  async save(@Body() user: User): Promise<User> {
    try {
      const { password } = user;
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);

      const result = await this.userService.save({
        ...user,
        password: hash,
      });

      return new User(result);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
