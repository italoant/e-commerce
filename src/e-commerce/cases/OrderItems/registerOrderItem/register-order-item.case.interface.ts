import { OrderItem } from 'src/e-commerce/domain/entities/orderItems/orderItem.entity';
import { OrderItemDto } from 'src/e-commerce/infrastructure/controllers/dto/order-item.request.dto';

export interface RegisterOrderItemCaseInterface {
  exec(data: OrderItemDto): Promise<OrderItem>;
}
