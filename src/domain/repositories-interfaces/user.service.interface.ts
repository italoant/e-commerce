import { User } from 'src/domain/entities/user.entity';
import { RepositoryInterface } from './default.repository.interface';

export interface UserInterface extends RepositoryInterface<User> {
  findUserToConfirmEmail(data: User): Promise<string>;
  findByOption(data: User): Promise<User>;
}
