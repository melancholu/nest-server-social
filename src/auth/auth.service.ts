import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  InvalidTokenException,
  UserNotFoundException,
} from 'src/core/exception';
import { JwtPayload, Token } from 'src/domain/auth';
import { USER_REPOSITORY, UserRepository, User } from 'src/domain/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  getToken(uuid: string): Token {
    const payload: JwtPayload = { uuid };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(uuid: string, refreshToken: string): Promise<void> {
    return this.userRepository.updateRefreshToken(uuid, refreshToken);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.getOneByEmail(email);

    if (user === null) {
      throw new UserNotFoundException();
    }

    const result = await this.verifyPassword(password, user.password);

    if (!result) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async verifyPassword(
    password: string,
    currentPassword: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, currentPassword);
    } catch (error) {
      throw new UserNotFoundException();
    }
  }

  async verifyRefreshToken(
    uuid: string,
    refreshToken: string,
  ): Promise<boolean> {
    const user = await this.userRepository.getOneByUuid(uuid);

    if (user.refreshToken !== refreshToken) {
      throw new InvalidTokenException();
    }

    return user.refreshToken === refreshToken;
  }
}
