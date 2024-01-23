import { Inject } from '@nestjs/common';
import { DeleteUserCaseInterface } from './delete-users.case.interface';
import { UserInterface } from 'src/common/service-interfaces/user-interface/user.service.interface';
import { UserRequestDto } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';
import { ClientInterface } from 'src/common/service-interfaces/client-interface/client.repository.interface';

export class DeleteUser implements DeleteUserCaseInterface {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
    @Inject('ClientInterface')
    private readonly clientRepository: ClientInterface,
  ) {}
  async exec(data: UserRequestDto): Promise<void | string> {
    const { id } = await this.userRepository.findOne(data);

    const hasClient = await this.clientRepository.findOneById(data.id);

    if (!hasClient) {
      return await this.userRepository.deleteUser(id);
    }
    return 'nao é possivel excluir esse usuario, existe clientes vinculados a ele';
  }
}
