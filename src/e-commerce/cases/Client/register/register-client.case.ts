import { Inject, Injectable } from '@nestjs/common';
import { RegisterClientCaseInterface } from './register-client.case.interface';
import { ClientInterface } from 'src/common/service-interfaces/client-interface/client.repository.interface';
import { Client } from 'src/e-commerce/domain/entities/client/client.entity';
import { ClientRequest } from 'src/e-commerce/infrastructure/controllers/dto/client.request.dto';
import { UserInterface } from 'src/common/service-interfaces/user-interface/user.service.interface';
import { UserRequest } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';

@Injectable()
export class RegisterClient implements RegisterClientCaseInterface {
  constructor(
    @Inject('ClientInterface')
    private readonly clientRepository: ClientInterface,
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
  ) {}
  async exec(data: ClientRequest): Promise<Client> {
    data.creation_date = new Date();
    data.update_date = new Date();

    const userRemap = await this.remapToGetUser(data);
    try {
      const id = await this.userRepository.findByOption(userRemap);

      const clientAlreadyExists =
        await this.clientRepository.findOneByOptions(data);
      if (!clientAlreadyExists && id) {
        return await this.clientRepository.createClient(data, id.id);
      }
    } catch (e) {
      return e;
    }
  }

  private async remapToGetUser(data): Promise<UserRequest> {
    return {
      name: data.full_name,
      email: data.email,
      password: data.password,
    } as UserRequest;
  }
}
