import { Client } from 'src/e-commerce/domain/entities/client/client.entity';
import { ClientRequestDto } from 'src/e-commerce/infrastructure/controllers/dto/client.request.dto';

export interface ClientInterface {
  findOneById(data: string): Promise<Client>;
  findOneByOptions(data: ClientRequestDto): Promise<Client>;
  findAll(): Promise<Client[]>;
  createClient(data: ClientRequestDto, id: string): Promise<Client>;
  deleteClient(id: string): Promise<void>;
  updateClient(data: ClientRequestDto): Promise<Client>;
}
