import { User } from 'src/domain/entities/users/user.entity';

export interface ListUseCaseInterface {
  exec(req): Promise<User[]>;
}
