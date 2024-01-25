import { OrderItem } from 'src/e-commerce/domain/entities/orderItems/orderItem.entity';
import { OrderItemRequest } from 'src/e-commerce/infrastructure/controllers/dto/order-item.request.dto';
import { User } from '../../../domain/entities/users/user.entity';

export interface RegisterOrderItemCaseInterface {
  exec(user: User, data: OrderItemRequest): Promise<OrderItem>;
}
