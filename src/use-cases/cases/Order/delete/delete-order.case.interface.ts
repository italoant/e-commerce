import { User } from '../../../../domain/entities/user.entity';

export interface DeleteOrderCaseInterface {
  exec(user: User, id: string): Promise<void>;
}
