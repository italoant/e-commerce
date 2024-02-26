import { Inject, InternalServerErrorException } from '@nestjs/common';
import { ConfirmEmailCaseInterface } from './confirm-email.case.interface';
import { UserInterface } from '../../../../domain/repositories-interfaces/user.service.interface';
import { EmailValidatorRequest } from '../../../../infrastructure/controllers/dto/email-validation.request.dto';
import { User } from '../../../../domain/entities/user.entity';

export class ConfirmEmailCase implements ConfirmEmailCaseInterface {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
  ) {}
  async exec(data: EmailValidatorRequest): Promise<string> {
    const confirmEmailDto = {
      name: data.name,
      email: data.email,
      code: data.code,
    } as User;

    const user = await this.userRepository.findByOption(confirmEmailDto);

    if (user.code === data.code) {
      return await this.userRepository.findUserToConfirmEmail(user);
    }
    throw new InternalServerErrorException('Nome, email ou codigo incorreto');
  }
}
