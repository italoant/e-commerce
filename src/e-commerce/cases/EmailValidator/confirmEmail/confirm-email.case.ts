import { Inject, InternalServerErrorException } from '@nestjs/common';
import { UserRequest } from 'src/infrastructure/controllers/dto/user-request.dto';
import { ConfirmEmailCaseInterface } from './confirm-email.case.interface';
import { CreateUserRequest } from '../../../../infrastructure/controllers/dto/create-user-request.dto';
import { UserInterface } from '../../../../common/service-interfaces/user.service.interface';

export class ConfirmEmailCase implements ConfirmEmailCaseInterface {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
  ) {}
  async exec(data: CreateUserRequest): Promise<string> {
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
