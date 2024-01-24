import { UserRequest } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';
import { User } from '../../../domain/entities/users/user.entity';

export interface DeleteUserCaseInterface {
  exec(user: User, data: UserRequest): Promise<void | string>;
}
