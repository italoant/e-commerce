import { Client } from '../../../../domain/entities/client.entity';
import { User } from '../../../../domain/entities/user.entity';

export interface GetClientByUserInterface {
  exec(user: User): Promise<Client>;
}
