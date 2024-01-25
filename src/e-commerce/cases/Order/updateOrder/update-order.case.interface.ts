import { Order } from 'src/e-commerce/domain/entities/orders/order.entity';
import { User } from '../../../domain/entities/users/user.entity';
import { OrderRequest } from '../../../infrastructure/controllers/dto/order.request.dto';

export interface UpdateOrderCaseInterface {
  exec(user: User, data: OrderRequest): Promise<Order>;
}
