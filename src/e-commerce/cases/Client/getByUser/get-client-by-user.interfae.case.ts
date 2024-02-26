import { Client } from '../../../../domain/entities/client/client.entity';
import { UserRequest } from '../../../../infrastructure/controllers/dto/user-request.dto';

export interface GetClientByUserInterface {
  exec(user: UserRequest): Promise<Client>;
}
