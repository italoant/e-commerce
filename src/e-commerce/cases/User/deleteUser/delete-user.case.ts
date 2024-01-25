import { Inject, InternalServerErrorException } from '@nestjs/common';
import { DeleteUserCaseInterface } from './delete-users.case.interface';
import { UserInterface } from 'src/common/service-interfaces/user-interface/user.service.interface';
import { UserRequest } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';
import { ClientInterface } from 'src/common/service-interfaces/client-interface/client.repository.interface';
import { User } from '../../../domain/entities/users/user.entity';
import { ClientType } from '../../../domain/entities/users/user-enum';

export class DeleteUser implements DeleteUserCaseInterface {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
    @Inject('ClientInterface')
    private readonly clientRepository: ClientInterface,
  ) {}
  async exec(user: User, data: UserRequest): Promise<void> {
    if (user.type === ClientType.ADMIN) {
      const hasClient = await this.clientRepository.findOneByExternalUserId(
        data.id,
      );
      if (!hasClient) {
        return await this.userRepository.deleteUser(data.id);
      }
      throw new InternalServerErrorException('Erro ao deletar usuario');
    }

    const { id } = await this.userRepository.findByOption(user);
    const hasClient = await this.clientRepository.findOneByExternalUserId(id);

    if (id === data.id && !hasClient) {
      return await this.userRepository.deleteUser(id);
    }
    throw new InternalServerErrorException('Erro ao deletar usuario');
  }
}
