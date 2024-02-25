import { Client } from 'src/domain/entities/client.entity';
import { ClientRequest } from 'src/infrastructure/controllers/dto/client.request.dto';
import { DefaultInterface } from './default.repository.interface';

export interface ClientInterface extends DefaultInterface<Client> {
  findOneByExternalUserId(id: string): Promise<Client>;
  findOneByOptions(data: ClientRequest): Promise<Client>;
}
