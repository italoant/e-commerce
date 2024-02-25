import { Client } from 'src/domain/entities/client.entity';
import { GetClientInterface } from './get-client.case.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ClientRequest } from '../../../../infrastructure/controllers/dto/client.request.dto';
import { ClientInterface } from '../../../../domain/repositories-interfaces/client.repository.interface';
import { UserInterface } from '../../../../domain/repositories-interfaces/user.service.interface';
import { User } from '../../../../domain/entities/user.entity';

@Injectable()
export class GetClient implements GetClientInterface {
  constructor(
    @Inject('ClientInterface')
    private readonly clientRepository: ClientInterface,
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
  ) {}
  async exec(user: User, id: string): Promise<Client> {
    if (user.type === 'ADMIN' && id) {
      const data = {
        id: id,
      } as ClientRequest;
      return await this.clientRepository.findOneByOptions(data);
    }

    const userResponse = await this.userRepository.findByOption(user);
    return await this.clientRepository.findOneByExternalUserId(userResponse.id);
  }
}
