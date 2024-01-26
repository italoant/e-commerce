import { Client } from 'src/e-commerce/domain/entities/client/client.entity';
import { ClientRequest } from 'src/e-commerce/infrastructure/controllers/dto/client.request.dto';
import { User } from '../../../domain/entities/users/user.entity';
export interface RegisterClientCaseInterface {
  exec(user: User, data: ClientRequest): Promise<Client>;
}
