import { OrderItem } from 'src/e-commerce/domain/entities/orderItems/orderItem.entity';

export interface UpdateOrderItemCaseInterface {
  exec(data): Promise<OrderItem>;
}
