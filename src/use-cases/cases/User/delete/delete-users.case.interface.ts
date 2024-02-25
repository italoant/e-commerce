import { User } from '../../../../domain/entities/user.entity';

export interface DeleteUserCaseInterface {
  exec(user: User, id: string): Promise<void | string>;
}
