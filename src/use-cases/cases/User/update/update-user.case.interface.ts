import { User } from 'src/domain/entities/user.entity';
import { UserRequest } from '../../../../infrastructure/controllers/dto/user.request.dto';

export interface UpdateUserCaseInterface {
  exec(user: User, data: UserRequest): Promise<User>;
}
