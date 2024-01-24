import { Client } from 'src/e-commerce/domain/entities/client/client.entity';
import { ListClientInterface } from './list-client.case.interface';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { ClientInterface } from 'src/common/service-interfaces/client-interface/client.repository.interface';
import { CurrentUser } from '../../../../common/current-user-decorator/current-user.decorator';
import { User } from '../../../domain/entities/users/user.entity';
import { ClientType } from '../../../domain/entities/users/user-enum';

export class ListClients implements ListClientInterface {
  constructor(
    @Inject('ClientInterface')
    private readonly clientRepository: ClientInterface,
  ) {}
  async exec(@CurrentUser() user: User): Promise<Client[]> {
    if (user.type === ClientType.ADMIN) {
      return await this.clientRepository.findAll();
    }
    throw new InternalServerErrorException(
      'usuario do tipo de cliente nao podem ver todos usuarios',
    );
  }
}
