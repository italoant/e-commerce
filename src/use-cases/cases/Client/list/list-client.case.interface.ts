import { Client } from 'src/domain/entities/client.entity';
import { User } from '../../../../domain/entities/user.entity';

export interface ListClientInterface {
  exec(user: User): Promise<Client[]>;
}
