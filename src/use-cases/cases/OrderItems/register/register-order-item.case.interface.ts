import { OrderItem } from 'src/domain/entities/orderItem.entity';
import { OrderItemRequest } from 'src/infrastructure/controllers/dto/order-item.request.dto';
import { User } from '../../../../domain/entities/user.entity';

export interface RegisterOrderItemCaseInterface {
  exec(user: User, data: OrderItemRequest): Promise<OrderItem>;
}
