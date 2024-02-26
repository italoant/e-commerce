import { Order } from '../../../../domain/entities/orders/order.entity';
import { User } from '../../../../domain/entities/users/user.entity';

export interface ConfirmLastOrderInterface {
  exec(user: User): Promise<Order>;
}
