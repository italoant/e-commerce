import { Inject, Injectable } from '@nestjs/common';
import { ClientInterface } from '../../../../common/service-interfaces/client.repository.interface';
import { UserInterface } from '../../../../common/service-interfaces/user.service.interface';
import { Client } from '../../../../domain/entities/client/client.entity';
import { GetClientByUserInterface } from './get-client-by-user.interfae.case';
import { UserRequest } from '../../../../infrastructure/controllers/dto/user-request.dto';

@Injectable()
export class GetClientByUser implements GetClientByUserInterface {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
    @Inject('ClientInterface')
    private readonly clientRepository: ClientInterface,
  ) {}
  async exec(user: UserRequest): Promise<Client> {
    const { id } = await this.userRepository.findByOption(user);

    return await this.clientRepository.findOneByExternalUserId(id);
  }
}