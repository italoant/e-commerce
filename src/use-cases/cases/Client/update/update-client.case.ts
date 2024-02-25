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
import { UserInterface } from '../../../../domain/repositories-interfaces/user.service.interface';

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
      return this.clientRepository.update(data);
    }

    const { id } = await this.userRepository.findByOption(user);

    const getClient = await this.clientRepository.findOneByExternalUserId(id);

    if (data.id === getClient.id) {
      return await this.clientRepository.update(data);
    }
    throw new InternalServerErrorException('erro durante process de update');
  }
}
