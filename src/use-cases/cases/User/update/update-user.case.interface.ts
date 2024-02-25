import { User } from 'src/domain/entities/user.entity';
import { UserRequest } from 'src/infrastructure/controllers/dto/user-request.dto';
import { UpdateUserRequest } from '../../../../infrastructure/controllers/dto/update-user.request.dto';

export interface UpdateUserCaseInterface {
  exec(user: User, data: UpdateUserRequest): Promise<User>;
}
