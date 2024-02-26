import { Client } from 'src/domain/entities/client.entity';
import { User } from '../../../../domain/entities/user.entity';

export interface GetClientInterface {
  exec(user: User, id: string): Promise<Client>;
}
