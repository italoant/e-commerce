import { Client } from 'src/domain/entities/client/client.entity';
import { UserRequest } from 'src/infrastructure/controllers/dto/user-request.dto';
import { ClientRequest } from '../../../../infrastructure/controllers/dto/client.request.dto';

export interface GetClientInterface {
  exec(user: UserRequest, id: string): Promise<Client>;
}
