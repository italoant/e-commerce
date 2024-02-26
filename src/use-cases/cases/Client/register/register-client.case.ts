import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterClientCaseInterface } from './register-client.case.interface';
import { Client } from 'src/domain/entities/client.entity';
import { ClientRequest } from 'src/infrastructure/controllers/dto/client.request.dto';
import { User } from '../../../../domain/entities/user.entity';
import { ClientInterface } from '../../../../domain/repositories-interfaces/client.repository.interface';
import { UserInterface } from '../../../../domain/repositories-interfaces/user.service.interface';

@Injectable()
export class RegisterClient implements RegisterClientCaseInterface {
  constructor(
    @Inject('ClientInterface')
    private readonly clientRepository: ClientInterface,
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
  ) {}
  async exec(user: User, data: ClientRequest): Promise<Client> {
    const { id } = await this.userRepository.findByOption(user);

    const newData = {
      full_name: data.full_name,
      external_user_id: data.external_user_id,
      contact: data.contact,
      address: data.address,
      isActive: data.isActive,
    } as Client;

    const clientAlreadyExists =
      await this.clientRepository.findOneByOptions(newData);
    if (!clientAlreadyExists && id) {
      const clientData = {
        external_user_id: id,
        full_name: data.full_name,
        contact: data.contact,
        address: data.address,
        isActive: data.isActive,
        creation_date: new Date(),
        update_date: new Date(),
      } as Client;

      return await this.clientRepository.create(clientData);
    }
    throw new InternalServerErrorException(`usuario ou cliente inexistente`);
  }
}
