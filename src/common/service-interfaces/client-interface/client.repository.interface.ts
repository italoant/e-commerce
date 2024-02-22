import { Client } from 'src/e-commerce/domain/entities/client/client.entity';
import { ClientRequest } from 'src/e-commerce/infrastructure/controllers/dto/client.request.dto';

export interface ClientInterface {
  findOneByExternalUserId(id: string): Promise<Client>;
  findOneById(data: string): Promise<Client>;
  findOneByOptions(data: ClientRequest): Promise<Client>;
  findAll(): Promise<Client[]>;
  createClient(data: ClientRequest, id: string): Promise<Client>;
  deleteClient(id: string): Promise<void>;
  updateClient(data: ClientRequest): Promise<Client>;
}
