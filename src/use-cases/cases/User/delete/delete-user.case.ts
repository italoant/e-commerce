import { Inject, InternalServerErrorException } from '@nestjs/common';
import { DeleteUserCaseInterface } from './delete-users.case.interface';
import { User } from '../../../../domain/entities/user.entity';
import { ClientType } from '../../../../domain/entities/enums/user-enum';
import { ClientInterface } from '../../../../domain/repositories-interfaces/client.repository.interface';
import { UserInterface } from '../../../../domain/repositories-interfaces/user.service.interface';

export class DeleteUser implements DeleteUserCaseInterface {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
    @Inject('ClientInterface')
    private readonly clientRepository: ClientInterface,
  ) {}
  async exec(user: User, id: string): Promise<void> {
    if (user.type === ClientType.ADMIN) {
      const hasClient = await this.clientRepository.findOneByExternalUserId(id);
      if (!hasClient) {
        return await this.userRepository.deleteUser(id);
      }
      throw new InternalServerErrorException('Erro ao deletar usuario');
    }

    const userId = await this.userRepository.findByOption(user);
    const hasClient = await this.clientRepository.findOneByExternalUserId(id);

    if (id === userId.id && !hasClient) {
      return await this.userRepository.deleteUser(id);
    }
    throw new InternalServerErrorException('Erro ao deletar usuario');
  }
}
