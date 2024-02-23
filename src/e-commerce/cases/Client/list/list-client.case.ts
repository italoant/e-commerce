import { Client } from 'src/domain/entities/client/client.entity';
import { ListClientInterface } from './list-client.case.interface';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { CurrentUser } from '../../../../common/current-user-decorator/current-user.decorator';
import { User } from '../../../../domain/entities/users/user.entity';
import { ClientType } from '../../../../domain/entities/users/user-enum';
import { ClientInterface } from '../../../../common/service-interfaces/client.repository.interface';

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
