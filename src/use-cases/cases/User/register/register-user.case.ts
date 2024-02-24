import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterUserCaseInterface } from './register-user.case.interface';
import * as bcrypt from 'bcrypt';
import { CreateUserRequest } from 'src/infrastructure/controllers/dto/create-user-request.dto';
import { User } from 'src/domain/entities/user.entity';
import { Prisma } from '@prisma/client';
import { UserInterface } from '../../../../domain/repositories-interfaces/user.service.interface';
import { SendMailService } from '../../../../infrastructure/mailer-service/mailer.service';

@Injectable()
export class RegisterUser implements RegisterUserCaseInterface {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
    private mailService: SendMailService,
  ) {}
  async exec(data: CreateUserRequest): Promise<User> {
    try {
      const userAlreadyExists = await this.userRepository.findByOption(data);
      if (!userAlreadyExists) {
        const code = await this.randomNumber();

        const encryptData: Prisma.UserCreateInput = {
          ...data,
          code,
          password: await bcrypt.hash(data.password, 10),
        };

        await this.mailService.sendEmail(data, code);

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

    return roundedNumber;
  }
}
