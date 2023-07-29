import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    const message = 'User not found';
    super(message, HttpStatus.NOT_FOUND);
  }
}
