import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from './create-user.dto';

@Controller('create-user')
export class CreateUserController {

  @Post('/')
  createUser(@Body() userDto: createUserDto) {
    return userDto;
  }
}
