import { Client } from 'src/domain/entities/client/client.entity';
import { ClientRequest } from 'src/infrastructure/controllers/dto/client.request.dto';
import { User } from '../../../../domain/entities/users/user.entity';

export interface RegisterClientCaseInterface {
  exec(user: User, data: ClientRequest): Promise<Client>;
}
