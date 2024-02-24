import { User } from '../../../../domain/entities/user.entity';

export interface DeleteProductCaseInterface {
  exec(user: User, id: string): Promise<void | string>;
}
