import { UpdateClientInterface } from './update-client.case.interface';
import { Client } from 'src/e-commerce/domain/entities/client/client.entity';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientInterface } from 'src/common/service-interfaces/client-interface/client.repository.interface';
import { ClientRequest } from 'src/e-commerce/infrastructure/controllers/dto/client.request.dto';
import { UserInterface } from 'src/common/service-interfaces/user-interface/user.service.interface';
import { CurrentUser } from '../../../../common/current-user-decorator/current-user.decorator';
import { User } from '../../../domain/entities/users/user.entity';
import { ClientType } from '../../../domain/entities/users/user-enum';

@Injectable()
export class UpdateClient implements UpdateClientInterface {
  constructor(
    @Inject('ClientInterface')
    private readonly clientRepository: ClientInterface,
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
  ) {}
  async exec(@CurrentUser() user: User, data: ClientRequest): Promise<Client> {
    if (user.type === ClientType.ADMIN) {
      return this.clientRepository.updateClient(data);
    }

    const { id } = await this.userRepository.findByOption(user);

    const getClient = await this.clientRepository.findOneByExternalUserId(id);

    if (data.id === getClient.id) {
      return await this.clientRepository.updateClient(data);
    }
    throw new InternalServerErrorException('erro durante process de update');
  }
}
