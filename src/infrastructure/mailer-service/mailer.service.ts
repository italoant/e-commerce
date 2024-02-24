import { MailerService } from '@nestjs-modules/mailer';
import { CreateUserRequest } from '../controllers/dto/create-user-request.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendMailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(data: CreateUserRequest, code: string) {
    await this.mailerService.sendMail({
      to: data.email,
      from: 'e-commerce@dominio.com.br',
      subject: 'Enviando Email com NestJS',
      html: `code: ${code}, clique aqui para confirmar: <a href="http://localhost:3000/auth/verify/login/">Website</a>`,
    });
  }
}
