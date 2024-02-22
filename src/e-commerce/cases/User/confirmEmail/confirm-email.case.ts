import { Inject, InternalServerErrorException } from '@nestjs/common';
import { UserInterface } from 'src/common/service-interfaces/user-interface/user.service.interface';
import { UserRequest } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';
import { ConfirmEmailCaseInterface } from './confirm-email.case.interface';
import { ConfirmEmailRequest } from '../../../infrastructure/controllers/dto/confirm-email.request.dto';

export class ConfirmEmailCase implements ConfirmEmailCaseInterface {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
  ) {}
  async exec(data: ConfirmEmailRequest): Promise<string> {
    const confirmEmailDto = {
      name: data.name,
      email: data.email,
      code: data.code,
    } as UserRequest;

    const user = await this.userRepository.findByOption(confirmEmailDto);


    if (user) {
      return await this.userRepository.findUserToConfirmEmail(user);
    }
    throw new InternalServerErrorException('Erro ao procurar usuario usuario');
}
}
