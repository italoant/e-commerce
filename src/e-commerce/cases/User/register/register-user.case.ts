import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { RegisterUserCaseInterface } from './register-user.case.interface';
import * as bcrypt from 'bcrypt';
import { CreateUserRequest } from 'src/infrastructure/controllers/dto/create-user-request.dto';
import { User } from 'src/domain/entities/users/user.entity';
import { Prisma } from '@prisma/client';
import { MailerService } from '@nestjs-modules/mailer';
import { UserInterface } from '../../../../common/service-interfaces/user.service.interface';

@Injectable()
export class RegisterUser implements RegisterUserCaseInterface {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
    private mailerService: MailerService,
  ) {}
  async exec(data: CreateUserRequest): Promise<User> {
    try {
      const userAlreadyExists = await this.userRepository.findByOption(data);
      if (!userAlreadyExists) {
        let code = await this.randomNumber()

        const encryptData: Prisma.UserCreateInput = {
          ...data,
          code,
          password: await bcrypt.hash(data.password, 10),
        };

        await this.sendCodeEmail(data, code)


        return await this.userRepository.createUser(encryptData);
      }
      throw new InternalServerErrorException('user already exists');
    } catch (e) {
      return e;
    }
  }

  private async randomNumber(): Promise<string> {

    const randomNumber = Math.floor(Math.random() * 1000000);

    const roundedNumber = String(randomNumber).padStart(6, '0');

    
    return roundedNumber
  }

  private async sendCodeEmail(data: CreateUserRequest, code: string): Promise<void> {
    const response = await this.mailerService.sendMail({
      to: data.email,
      from: 'e-commerce@dominio.com.br',
      subject: 'Enviando Email com NestJS',
      html: `code: ${code}, clique aqui para confirmar: <a href="http://localhost:3000/auth/verify/login/">Website</a>`,
    });
  
}
}
