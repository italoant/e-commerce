import { OrderItem } from 'src/e-commerce/domain/entities/orderItems/orderItem.entity';
import { OrderItemRequest } from 'src/e-commerce/infrastructure/controllers/dto/order-item.request.dto';
import { UserRequest } from '../../../infrastructure/controllers/dto/user-request.dto';

export interface RegisterOrderItemCaseInterface {
  exec(user: UserRequest, data: OrderItemRequest): Promise<OrderItem>;
}
