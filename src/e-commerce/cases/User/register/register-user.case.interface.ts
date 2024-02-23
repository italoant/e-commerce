import { User } from 'src/domain/entities/users/user.entity';
import { CreateUserRequest } from 'src/infrastructure/controllers/dto/create-user-request.dto';

export interface RegisterUserCaseInterface {
  exec(userData: CreateUserRequest): Promise<User>;
}
