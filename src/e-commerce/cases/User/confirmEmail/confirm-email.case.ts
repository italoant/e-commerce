import { Inject, InternalServerErrorException } from '@nestjs/common';
import { UserInterface } from 'src/common/service-interfaces/user-interface/user.service.interface';
import { UserRequest } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';
import { ClientInterface } from 'src/common/service-interfaces/client-interface/client.repository.interface';
import { ConfirmEmailCaseInterface } from './confirm-email.case.interface';

export class ConfirmEmailCase implements ConfirmEmailCaseInterface {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
  ) {}
  async exec(data: UserRequest): Promise<string> {
    const user = await this.userRepository.findByOption(data);


    if (user) {
      return await this.userRepository.findUserToConfirmEmail(user);
    }
    throw new InternalServerErrorException('Erro ao procurar usuario usuario');
}
}
