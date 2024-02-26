import { Client } from 'src/domain/entities/client.entity';
import { RepositoryInterface } from './default.repository.interface';

export interface ClientInterface extends RepositoryInterface<Client> {
  findOneByExternalUserId(id: string): Promise<Client>;
  findOneByOptions(data: Client): Promise<Client>;
}
