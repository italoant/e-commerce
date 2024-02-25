import { Inject, InternalServerErrorException } from '@nestjs/common';
import { UserRequest } from 'src/infrastructure/controllers/dto/user-request.dto';
import { ConfirmEmailCaseInterface } from './confirm-email.case.interface';
import { UserInterface } from '../../../../domain/repositories-interfaces/user.service.interface';
import { EmailValidatorRequest } from '../../../../infrastructure/controllers/dto/email-validation.request.dto';

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
    } as UserRequest;

    const user = await this.userRepository.findByOption(confirmEmailDto);

    if (user) {
      return await this.userRepository.findUserToConfirmEmail(user);
    }
    throw new InternalServerErrorException('Nome, email ou codigo incorreto');
  }
}
