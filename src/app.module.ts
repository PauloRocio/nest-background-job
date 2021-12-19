import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateUserController } from './create-user/create-user.controller';
import { SendMailConsumer } from './jobs/send-mail-consumer';
import { SendMailProducer } from './jobs/send-mail-producer';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379
      }
    }),
    BullModule.registerQueue({
      name: 'sendMailQueue'
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      }
    })
  ],
  controllers: [AppController, CreateUserController],
  providers: [AppService, SendMailProducer, SendMailConsumer],
})
export class AppModule { }
