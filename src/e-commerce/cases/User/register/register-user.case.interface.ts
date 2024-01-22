import { User } from 'src/e-commerce/domain/entities/users/user.entity';
import { CreateUserRequestDto } from 'src/e-commerce/infrastructure/controllers/dto/create-user-request.dto';

export interface RegisterUserCaseInterface {
  exec(userData: CreateUserRequestDto): Promise<User>;
}
