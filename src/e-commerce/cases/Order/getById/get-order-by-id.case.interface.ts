import { Order } from 'src/e-commerce/domain/entities/orders/order.entity';
import { User } from '../../../domain/entities/users/user.entity';
import { OrderRequest } from '../../../infrastructure/controllers/dto/Order.request.dto';

export interface GetOrderByIdCaseInterface {
  exec(user: User, id: string): Promise<Order>;
}
