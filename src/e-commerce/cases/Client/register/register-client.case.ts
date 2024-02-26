import { Inject, Injectable } from '@nestjs/common';
import { RegisterClientCaseInterface } from './register-client.case.interface';
import { Client } from 'src/domain/entities/client/client.entity';
import { ClientRequest } from 'src/infrastructure/controllers/dto/client.request.dto';
import { User } from '../../../../domain/entities/users/user.entity';
import { ClientInterface } from '../../../../common/service-interfaces/client.repository.interface';
import { UserInterface } from '../../../../common/service-interfaces/user.service.interface';

@Injectable()
export class RegisterClient implements RegisterClientCaseInterface {
  constructor(
    @Inject('ClientInterface')
    private readonly clientRepository: ClientInterface,
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
  ) {}
  async exec(user: User, data: ClientRequest): Promise<Client> {
    try {
      const { id } = await this.userRepository.findByOption(user);

      const clientAlreadyExists =
        await this.clientRepository.findOneByOptions(data);
      if (!clientAlreadyExists && id) {
        return await this.clientRepository.createClient(data, id);
      }
    } catch (e) {
      return e;
    }
  }
}
