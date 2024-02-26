import { User } from 'src/domain/entities/user.entity';

export interface ListUseCaseInterface {
  exec(req): Promise<User[]>;
}
