import { User } from 'src/domain/entities/user.entity';
import { UserRequest } from 'src/infrastructure/controllers/dto/user-request.dto';
import { DefaultInterface } from './default.repository.interface';

export interface UserInterface extends DefaultInterface<User> {
  findUserToConfirmEmail(data: UserRequest): Promise<string>;
  findByOption(data: UserRequest): Promise<User>;
}
