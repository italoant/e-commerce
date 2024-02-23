import { User } from 'src/domain/entities/users/user.entity';
import { UserRequest } from 'src/infrastructure/controllers/dto/user-request.dto';

export interface UpdateUserCaseInterface {
  exec(user: User, data: UserRequest): Promise<User>;
}
