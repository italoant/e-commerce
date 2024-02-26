import { Order } from '../../../../domain/entities/order.entity';
import { User } from '../../../../domain/entities/user.entity';

export interface ConfirmLastOrderInterface {
  exec(user: User, paymentMethod: string): Promise<Order>;
}
