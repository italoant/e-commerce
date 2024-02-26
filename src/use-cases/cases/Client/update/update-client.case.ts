import { UpdateClientInterface } from './update-client.case.interface';
import { Client } from 'src/domain/entities/client.entity';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientRequest } from 'src/infrastructure/controllers/dto/client.request.dto';
import { CurrentUser } from '../../../../common/current-user-decorator/current-user.decorator';
import { User } from '../../../../domain/entities/user.entity';
import { ClientType } from '../../../../domain/entities/enums/user-enum';
import { ClientInterface } from '../../../../domain/repositories-interfaces/client.repository.interface';
import { GetClientByUserInterface } from '../getByUser/get-client-by-user.interfae.case';

@Injectable()
export class UpdateClient implements UpdateClientInterface {
  constructor(
    @Inject('ClientInterface')
    private readonly clientRepository: ClientInterface,
    @Inject('GetClientByUserInterface')
    private readonly getClientByUser: GetClientByUserInterface,
  ) {}
  async exec(@CurrentUser() user: User, data: ClientRequest): Promise<Client> {
    const clientData = {
      id: data.id,
      full_name: data.full_name,
      contact: data.contact,
      address: data.address,
      isActive: data.isActive,
      update_date: new Date(),
    } as Client;

    if (user.type === ClientType.ADMIN) {
      return this.clientRepository.update(clientData);
    }

    const { id } = await this.getClientByUser.exec(user);

    if (clientData.id === id) {
      return await this.clientRepository.update(clientData);
    }
    throw new InternalServerErrorException(
      'erro durante process de update, voce nao pode alterar outros clientes',
    );
  }
}
