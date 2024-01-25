import { Inject, Injectable } from '@nestjs/common';
import { ClientInterface } from '../../../../common/service-interfaces/client-interface/client.repository.interface';
import { UserInterface } from '../../../../common/service-interfaces/user-interface/user.service.interface';
import { Client } from '../../../domain/entities/client/client.entity';
import { User } from '../../../domain/entities/users/user.entity';
import { GetClientByUserInterface } from './get-client-by-user.interfae.case';

@Injectable()
export class GetClientByUser implements GetClientByUserInterface {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
    @Inject('ClientInterface')
    private readonly clientRepository: ClientInterface,
  ) {}
  async exec(user: User): Promise<Client> {
    const { id } = await this.userRepository.findByOption(user);

    return await this.clientRepository.findOneByExternalUserId(id);
  }
}
