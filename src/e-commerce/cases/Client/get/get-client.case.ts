import { Client } from 'src/e-commerce/domain/entities/client/client.entity';
import { GetClientInterface } from './get-client.case.interface';
import { UserRequestDto } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientInterface } from 'src/common/service-interfaces/client-interface/client.repository.interface';
import { UserInterface } from 'src/common/service-interfaces/user-interface/user.service.interface';

@Injectable()
export class GetClient implements GetClientInterface {
  constructor(
    @Inject('ClientInterface')
    private readonly clientRepository: ClientInterface,
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
  ) {}
  async exec(data: UserRequestDto): Promise<Client> {
    const { id } = await this.userRepository.findOne(data);
    return await this.clientRepository.findOneById(id);
  }
}
