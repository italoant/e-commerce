import { Client } from '../../../domain/entities/client/client.entity';
import { User } from '../../../domain/entities/users/user.entity';

export interface GetClientByUserInterface {
  exec(user: User): Promise<Client>;
}
