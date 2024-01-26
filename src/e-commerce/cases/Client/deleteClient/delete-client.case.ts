import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientInterface } from 'src/common/service-interfaces/client-interface/client.repository.interface';
import { CurrentUser } from '../../../../common/current-user-decorator/current-user.decorator';

import { DeleteClientInterface } from './delete-client.case.interface';
import { User } from '../../../domain/entities/users/user.entity';
import { ClientRequest } from '../../../infrastructure/controllers/dto/client.request.dto';
import { ClientType } from '../../../domain/entities/users/user-enum';
import { UserInterface } from '../../../../common/service-interfaces/user-interface/user.service.interface';

@Injectable()
export class DeleteClient implements DeleteClientInterface {
  constructor(
    @Inject('ClientInterface')
    private readonly clientRepository: ClientInterface,
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
  ) {}
  async exec(@CurrentUser() user: User, data: ClientRequest): Promise<void> {
    if (user.type === ClientType.ADMIN) {
      await this.clientRepository.deleteClient(data.id);
    }

    const { id } = await this.userRepository.findByOption(user);

    const client = await this.clientRepository.findOneByExternalUserId(id);
    if (client.id === data.id) {
      await this.clientRepository.deleteClient(data.id);
    }
    throw new InternalServerErrorException(
      'usuario do tipo cliente nao pode excluir outros clients',
    );
  }
}
