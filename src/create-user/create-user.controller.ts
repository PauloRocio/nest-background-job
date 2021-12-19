import { Body, Controller, Post } from '@nestjs/common';
import { SendMailProducer } from 'src/jobs/send-mail-producer';
import { CreateUserDto } from './create-user.dto';

@Controller('create-user')
export class CreateUserController {
  constructor(private sendMailService: SendMailProducer) {}

  @Post('/')
  createUser(@Body() userDto: CreateUserDto) {
    this.sendMailService.sendMail(userDto);
    return userDto;
  }
}
