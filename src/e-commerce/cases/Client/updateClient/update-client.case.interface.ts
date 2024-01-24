import { Client } from 'src/e-commerce/domain/entities/client/client.entity';
import { ClientRequest } from 'src/e-commerce/infrastructure/controllers/dto/client.request.dto';

export interface UpdateClientInterface {
  exec(data: ClientRequest): Promise<Client>;
}
