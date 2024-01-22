import { User } from 'src/e-commerce/domain/entities/users/user.entity';
import { UserRequestDto } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';

export interface UpdateUserCaseInterface {
  exec(data: UserRequestDto): Promise<User>;
}