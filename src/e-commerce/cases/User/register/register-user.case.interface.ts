import { User } from 'src/e-commerce/domain/entities/users/user.entity';
import { CreateUserRequest } from 'src/e-commerce/infrastructure/controllers/dto/create-user-request.dto';

export interface RegisterUserCaseInterface {
  exec(userData: CreateUserRequest): Promise<User>;
}
