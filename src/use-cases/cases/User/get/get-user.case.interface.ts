import { User } from 'src/domain/entities/user.entity';

export interface GetUserCaseInterface {
  exec(data: User): Promise<User>;
}
