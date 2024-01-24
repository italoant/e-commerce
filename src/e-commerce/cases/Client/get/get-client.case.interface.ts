import { Client } from 'src/e-commerce/domain/entities/client/client.entity';
import { UserRequest } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';
import { ClientRequest } from '../../../infrastructure/controllers/dto/client.request.dto';

export interface GetClientInterface {
  exec(user: UserRequest, data?: ClientRequest): Promise<Client>;
}
