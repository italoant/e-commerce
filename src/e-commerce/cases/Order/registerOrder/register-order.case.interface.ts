import { Order } from 'src/e-commerce/domain/entities/orders/order.entity';
import { OrderRequest } from 'src/e-commerce/infrastructure/controllers/dto/Order.request.dto';
import { User } from '../../../domain/entities/users/user.entity';

export interface RegisterOrderCaseInterface {
  exec(user: User, data: OrderRequest): Promise<Order>;
}
