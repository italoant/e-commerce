import { UpdateClientInterface } from './update-client.case.interface';
import { Client } from 'src/e-commerce/domain/entities/client/client.entity';
import { Inject, Injectable } from '@nestjs/common';
import { ClientInterface } from 'src/common/service-interfaces/client-interface/client.repository.interface';
import { ClientRequestDto } from 'src/e-commerce/infrastructure/controllers/dto/client.request.dto';

@Injectable()
export class UpdateClient implements UpdateClientInterface {
  constructor(
    @Inject('ClientInterface')
    private readonly clientRepository: ClientInterface,
  ) {}
  async exec(data: ClientRequestDto): Promise<Client> {
    const userUpdate = await this.remapForUpdate(data);

    return await this.clientRepository.updateClient(data.id, userUpdate);
  }

  private async remapForUpdate(data: ClientRequestDto) {
    return {
      userFullName: data.userFullName,
      contact: data.contact,
      address: data.address,
      status: data.status,
      email: data.email,
    } as ClientRequestDto;
  }
}
