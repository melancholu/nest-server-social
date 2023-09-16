import {
  ClassSerializerInterceptor,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  InvalidTokenException,
  UserNotFoundException,
} from 'src/core/exception';
import { Token } from 'src/domain/auth';
import { AuthService } from './auth.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req): Promise<Token> {
    try {
      const { uuid } = req.user;
      const token = this.authService.getToken(uuid);

      await this.authService.updateRefreshToken(uuid, token.refreshToken);

      return token;
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw error;
      }

      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard())
  @Post('/logout')
  async logout(@Request() req): Promise<void> {
    try {
      const { uuid } = req.user;

      await this.authService.updateRefreshToken(uuid, null);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/refresh')
  async refresh(@Request() req): Promise<Token> {
    try {
      const { uuid, refreshToken } = req.user;

      if (!refreshToken) {
        throw new InvalidTokenException();
      }

      await this.authService.verifyRefreshToken(uuid, refreshToken);

      const token = this.authService.getToken(uuid);

      await this.authService.updateRefreshToken(uuid, token.refreshToken);

      return token;
    } catch (error) {
      if (error instanceof InvalidTokenException) {
        throw error;
      }

      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
