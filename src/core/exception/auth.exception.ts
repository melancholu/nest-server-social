import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidTokenException extends HttpException {
  constructor() {
    const message = 'Token is invalid';
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
