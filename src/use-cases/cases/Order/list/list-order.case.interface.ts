import { Order } from 'src/domain/entities/order.entity';
import { User } from '../../../../domain/entities/user.entity';

export interface ListOrderCaseInterface {
  exec(user: User): Promise<Order[]>;
}
