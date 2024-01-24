import { UpdateClientInterface } from './update-client.case.interface';
import { Client } from 'src/e-commerce/domain/entities/client/client.entity';
import { Inject, Injectable } from '@nestjs/common';
import { ClientInterface } from 'src/common/service-interfaces/client-interface/client.repository.interface';
import { ClientRequest } from 'src/e-commerce/infrastructure/controllers/dto/client.request.dto';
import { UserRequest } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';
import { UserInterface } from 'src/common/service-interfaces/user-interface/user.service.interface';

@Injectable()
export class UpdateClient implements UpdateClientInterface {
  constructor(
    @Inject('ClientInterface')
    private readonly clientRepository: ClientInterface,
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
  ) {}
  async exec(data): Promise<Client> {
    const { id } = await this.userRepository.findByOption({
      email: data.email,
      password: data.password,
    } as UserRequest);

    const getClient = await this.clientRepository.findOneById(id);

    const finalData = {
      id: getClient.id,
      full_name: data.full_name,
      contact: data.contact,
      address: data.address,
      isActive: data.isActive,
      creation_date: getClient.creation_date,
      update_date: new Date(),
      external_user_id: data.external_user_id,
    } as ClientRequest;

    return await this.clientRepository.updateClient(finalData);
  }
}
