import { Order } from 'src/domain/entities/orders/order.entity';
import { OrderRequest } from '../../../../infrastructure/controllers/dto/Order.request.dto';
import { User } from '../../../../domain/entities/users/user.entity';

export interface GetOrderByExternalUserCaseInterface {
  exec(user: User, id: string): Promise<Order[]>;
}
