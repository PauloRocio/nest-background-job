import { MailerService } from "@nestjs-modules/mailer";
import { Process, Processor } from "@nestjs/bull";
import { Job, Queue } from "bull";
import { CreateUserDto } from "src/create-user/create-user.dto";

@Processor('sendMailQueue')
class SendMailConsumer {
  constructor(private mailService: MailerService) {}

  @Process('sendMailJob')
  async sendMailJob(job: Job<CreateUserDto>) {
    const { data } = job;
    
    await this.mailService.sendMail({
      to: data.email,
      from: 'Equipe de relacionamento',
      subject: 'Bem vindo ao nosso site',
      text: `Olá ${data.name}, seu cadastro foi realizado com sucesso!`
    })
  }
}

export { SendMailConsumer }