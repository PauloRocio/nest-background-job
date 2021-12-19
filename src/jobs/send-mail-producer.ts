import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { CreateUserDto } from "src/create-user/create-user.dto";

@Injectable()
class SendMailProducer{
  constructor(@InjectQueue('sendMailQueue') private mailQueue: Queue) {}

  async sendMail(createUserDto: CreateUserDto) {
    this.mailQueue.add('sendMailJob', createUserDto);
  }
}

export { SendMailProducer }