import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterUserCaseInterface } from './register-user.case.interface';
import * as bcrypt from 'bcrypt';
import { User } from 'src/domain/entities/user.entity';
import { UserInterface } from '../../../../domain/repositories-interfaces/user.service.interface';
import { SendMailService } from '../../../../infrastructure/mailer-service/mailer.service';
import { UserRequest } from '../../../../infrastructure/controllers/dto/user.request.dto';

@Injectable()
export class RegisterUser implements RegisterUserCaseInterface {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
    private mailService: SendMailService,
  ) {}
  async exec(data: UserRequest): Promise<User> {
    try {
      const userRequest = {
        name: data.name,
        email: data.email,
        password: data.password,
        type: data.type,
      } as User;

      const userAlreadyExists =
        await this.userRepository.findByOption(userRequest);
      if (!userAlreadyExists) {
        const code = await this.randomNumber();

        const encryptData = {
          name: data.name,
          email: data.email,
          password: await bcrypt.hash(data.password, 10),
          type: data.type,
          code: code,
          isValidEmail: false,
          creation_date: new Date(),
          update_date: new Date(),
        } as User;

        await this.mailService.sendEmail(data, code);

        return await this.userRepository.create(encryptData);
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
