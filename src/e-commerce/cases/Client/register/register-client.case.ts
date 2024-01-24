import { Inject, Injectable } from '@nestjs/common';
import { RegisterClientCaseInterface } from './register-client.case.interface';
import { ClientInterface } from 'src/common/service-interfaces/client-interface/client.repository.interface';
import { Client } from 'src/e-commerce/domain/entities/client/client.entity';
import { ClientRequest } from 'src/e-commerce/infrastructure/controllers/dto/client.request.dto';
import { UserInterface } from 'src/common/service-interfaces/user-interface/user.service.interface';
import { User } from '../../../domain/entities/users/user.entity';

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
