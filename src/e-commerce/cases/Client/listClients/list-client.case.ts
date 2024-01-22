import { Client } from 'src/e-commerce/domain/entities/client/client.entity';
import { ListClientInterface } from './list-client.case.interface';
import { Inject } from '@nestjs/common';
import { ClientInterface } from 'src/common/service-interfaces/client-interface/client.repository.interface';

export class ListClients implements ListClientInterface {
  constructor(
    @Inject('ClientInterface')
    private readonly clientRepository: ClientInterface,
  ) {}
  async exec(): Promise<Client[]> {
    return await this.clientRepository.findAll();
  }
}
