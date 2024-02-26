import { Order } from 'src/domain/entities/orders/order.entity';
import { User } from '../../../../domain/entities/users/user.entity';

export interface ListOrderCaseInterface {
  exec(user: User): Promise<Order[]>;
}
