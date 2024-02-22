import { User } from 'src/e-commerce/domain/entities/users/user.entity';
import { UserRequest } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';

export interface GetUserCaseInterface {
  exec(data: UserRequest): Promise<User>;
}
