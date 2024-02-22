import { User } from 'src/e-commerce/domain/entities/users/user.entity';

export interface ListUseCaseInterface {
  exec(req): Promise<User[]>;
}
