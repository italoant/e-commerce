import { Client } from 'src/e-commerce/domain/entities/client/client.entity';
import { GetClientInterface } from './get-client.case.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ClientInterface } from 'src/common/service-interfaces/client-interface/client.repository.interface';
import { UserInterface } from 'src/common/service-interfaces/user-interface/user.service.interface';
import { User } from '../../../domain/entities/users/user.entity';
import { ClientRequest } from '../../../infrastructure/controllers/dto/client.request.dto';
import { ClientType } from '../../../domain/entities/users/user-enum';

@Injectable()
export class GetClient implements GetClientInterface {
  constructor(
    @Inject('ClientInterface')
    private readonly clientRepository: ClientInterface,
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
  ) {}
  async exec(user: User, data?: ClientRequest): Promise<Client> {
    if (user.type === ClientType.ADMIN && data) {
      return await this.clientRepository.findOneByOptions(data);
    }
    const { id } = await this.userRepository.findByOption(user);
    return await this.clientRepository.findOneByExternalUserId(id);
  }
}
