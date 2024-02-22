import { User } from '../../../domain/entities/users/user.entity';
import { ClientRequest } from '../../../infrastructure/controllers/dto/client.request.dto';

export interface DeleteClientInterface {
  exec(user: User, id: string): Promise<void>;
}
