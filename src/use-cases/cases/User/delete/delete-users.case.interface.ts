import { UserRequest } from 'src/infrastructure/controllers/dto/user-request.dto';
import { User } from '../../../../domain/entities/user.entity';

export interface DeleteUserCaseInterface {
  exec(user: User, id: string): Promise<void | string>;
}
