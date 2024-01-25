import { Client } from 'src/e-commerce/domain/entities/client/client.entity';
import { User } from '../../../domain/entities/users/user.entity';

export interface ListClientInterface {
  exec(user: User): Promise<Client[]>;
}
