import { Inject, Injectable } from '@nestjs/common';
import { ClientInterface } from 'src/common/service-interfaces/client-interface/client.repository.interface';

@Injectable()
export class DeleteClient implements DeleteClient {
  constructor(
    @Inject('ClientInterface')
    private readonly clientRepository: ClientInterface,
  ) {}
  async exec(id: string): Promise<void> {
    await this.clientRepository.deleteClient(id);
  }
}
