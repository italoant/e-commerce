import { Client } from 'src/domain/entities/client.entity';
import { ClientRequest } from 'src/infrastructure/controllers/dto/client.request.dto';
import { User } from '../../../../domain/entities/user.entity';

export interface UpdateClientInterface {
  exec(user: User, data: ClientRequest): Promise<Client>;
}
